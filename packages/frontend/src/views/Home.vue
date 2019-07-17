<template>
  <v-layout row>
    <v-dialog v-if="showDialog" v-model="showDialog" width="500">
      <TaskForm :taskType="selectedTaskType" @submit="addNewTask" />
    </v-dialog>
    <v-dialog v-if="showEditDialog" v-model="showEditDialog" width="500">
      <TaskForm :taskType="taskToEdit.type" :originalTask="taskToEdit" @submit="updateTask" />
    </v-dialog>

    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
      <v-card>
        <h3>Typescreeps</h3>
        <v-layout row>
          <v-flex offset-xs2 xs4>
            <v-select v-model="selectedTaskType" :items="taskTypes" label="Task Type"></v-select>
          </v-flex>
          <v-flex xs4>
            <v-btn
              color="success"
              @click="()=>this.showDialog = true"
              :disabled="selectedTaskType === null"
            >Add new task</v-btn>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card>
        <v-list two-line subheader>
          <v-list-group
            v-for="group in groupedTasks"
            :key="group.title"
            v-model="group.active"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-avatar>
                  <img :src="group.icon" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ group.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <TaskListTile
              v-for="task in group.tasks"
              :key="task.name"
              :task="task"
              @delete="deleteTask"
              @edit="editTask"
            />
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Task, TaskType, MineTask } from '@typescreeps/common';

import { Getter, State } from 'vuex-class';
import { store } from '@/store';

import TaskListTile from '../components/TaskListTile.vue'

import TaskForm from '../components/taskFroms/TaskForm.vue'
import BuildTaskForm from '../components/taskFroms/BuildTaskForm.vue'
import CarryTaskForm from '../components/taskFroms/CarryTaskForm.vue'
import ClaimTaskForm from '../components/taskFroms/ClaimTaskForm.vue'
import MineTaskForm from '../components/taskFroms/MineTaskForm.vue'
import MineBuildTaskForm from '../components/taskFroms/MineBuildTaskForm.vue'
import RepairTaskForm from '../components/taskFroms/RepairTaskForm.vue'
import SpawnDistributorTaskForm from '../components/taskFroms//SpawnDistributorTaskForm.vue'
import UpgradeTaskForm from '../components/taskFroms/UpgradeTaskForm.vue'
import { getTaskTypeIcon, getTaskForm, getTaskTypeArray } from '../service/taskType';

interface GroupedTask {
  title: string,
  active: boolean,
  icon: string,
  tasks: Task[],
}

@Component({ components: { TaskListTile, TaskForm } })
export default class Home extends Vue {


  @State('tasks') tasks!: Task[];

  @Watch('tasks')
  onTasksUpdated(newTasks: Task[]) {
    this.updateGroupedTasks(newTasks);
  }

  groupedTasks: GroupedTask[] = [];

  selectedTaskType: TaskType | null = null;

  showDialog = false;

  showEditDialog = false;
  taskToEdit: Task | null = null;
  editForm: string | null = null;

  get taskTypes() {
    return getTaskTypeArray();
  }

  updateGroupedTasks(tasks: Task[]) {
    const groupedTasks = [];
    for (const task of tasks) {
      const group = groupedTasks.find(gp => gp.title === task.type);
      const oldGroup = this.groupedTasks.find(gp => gp.title === task.type);
      if (!group) {
        groupedTasks.push({
          title: task.type,
          active: oldGroup ? oldGroup.active : false,
          icon: getTaskTypeIcon(task.type),
          tasks: [task],
        })
      } else {
        group.tasks.push(task)
      }
    }
    this.groupedTasks = groupedTasks.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  async created() {
    store.fetchRooms();
    store.fetchTasks();
  }

  async addNewTask(task: Task) {
    await this.$api.addTask(task);
    await store.fetchTasks();
    this.showDialog = false;
  }

  async updateTask(task: Task) {
    if (!this.taskToEdit) {
      throw Error('No Task to edit')
    }
    await this.$api.updateTask(this.taskToEdit.name, task);
    await store.fetchTasks();
    this.showEditDialog = false;
  }

  async deleteTask(taskName: string) {
    await this.$api.deleteTask(taskName);
    await store.fetchTasks();
  }

  editTask(task: Task) {
    this.editForm = getTaskForm(task.type);
    this.taskToEdit = task;
    this.showEditDialog = true;
  }

}
</script>

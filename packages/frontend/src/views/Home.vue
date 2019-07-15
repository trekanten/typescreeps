<template>
  <v-layout row>
    <v-dialog v-model="showDialog" width="500">
      <component :is="taskForm" @newTask="addTask" />
    </v-dialog>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
      <v-card>
        <h3>Typescreeps</h3>
        <v-layout row>
          <v-flex offset-xs2 xs4>
            <v-select v-model="selectedTask" :items="taskTypes" label="Task Type"></v-select>
          </v-flex>
          <v-flex xs4>
            <v-btn
              color="success"
              @click="()=>this.showDialog = true"
              :disabled="taskForm === null"
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

import BuildTaskForm from '../components/taskFroms/BuildTaskForm.vue'
import CarryTaskForm from '../components/taskFroms/CarryTaskForm.vue'
import ClaimTaskForm from '../components/taskFroms/ClaimTaskForm.vue'
import MineTaskForm from '../components/taskFroms/MineTaskForm.vue'
import MineBuildTaskForm from '../components/taskFroms/MineBuildTaskForm.vue'
import RepairTaskForm from '../components/taskFroms/RepairTaskForm.vue'
import SpawnDistributorTaskForm from '../components/taskFroms//SpawnDistributorTaskForm.vue'
import UpgradeTaskForm from '../components/taskFroms/UpgradeTaskForm.vue'
import { getTaskTypeIcon } from '../service/taskType';

interface GroupedTask {
  title: string,
  active: boolean,
  icon: string,
  tasks: Task[],
}

@Component({ components: { TaskListTile, BuildTaskForm, CarryTaskForm, ClaimTaskForm, MineTaskForm, MineBuildTaskForm, RepairTaskForm, SpawnDistributorTaskForm, UpgradeTaskForm } })
export default class Home extends Vue {


  @State('tasks') tasks!: Task[];

  @Watch('tasks')
  onTasksUpdated(newTasks: Task[]) {
    this.updateGroupedTasks(newTasks);
  }

  groupedTasks: GroupedTask[] = [];

  selectedTask: TaskType | null = null;

  showDialog = false;

  get taskTypes() {
    const taskTypes = [];
    for (var key in TaskType) {
      taskTypes.push(TaskType[key]);
    }
    return taskTypes;
  }

  get taskForm() {
    if (!this.selectedTask) {
      return null;
    }
    switch (this.selectedTask) {
      case TaskType.BUILD: {
        return 'BuildTaskForm';
        break;
      }
      case TaskType.CARRY: {
        return 'CarryTaskForm';
        break;
      }
      case TaskType.CLAIM: {
        return 'ClaimTaskForm';
        break;
      }
      case TaskType.MINE: {
        return 'MineTaskForm';
        break;
      }
      case TaskType.MINE_BUILD: {
        return 'MineBuildTaskForm';
        break;
      }
      case TaskType.REPAIR: {
        return 'RepairTaskForm';
        break;
      }
      case TaskType.SPAWN_DISTRIBUTOR: {
        return 'SpawnDistributorTaskForm';
        break;
      }
      case TaskType.UPGRADE: {
        return 'UpgradeTaskForm';
        break;
      }
      default: {
        console.error(`Task form for task type ${this.selectedTask} not found`);
        return null;
      }
    }
  }

  updateGroupedTasks(tasks: Task[]) {
    this.groupedTasks = [];
    for (const task of tasks) {
      const group = this.groupedTasks.find(gp => gp.title === task.type);
      if (!group) {
        this.groupedTasks.push({
          title: task.type,
          active: true,
          icon: getTaskTypeIcon(task.type),
          tasks: [task],
        })
      } else {
        group.tasks.push(task)
      }
    }
  }

  async created() {
    store.fetchRooms();
    store.fetchTasks();
  }

  async addTask(task: Task) {
    await this.$api.addTask(task);
    store.fetchTasks();
    this.showDialog = false;
  }

  async deleteTask(taskName: string) {
    await this.$api.deleteTask(taskName);
    store.fetchTasks();
  }

}
</script>

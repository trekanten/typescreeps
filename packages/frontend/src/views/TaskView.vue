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

      <TaskList @editTask="editTask" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Task, TaskType, MineTask } from '@typescreeps/common';

import { Getter, State } from 'vuex-class';
import { store } from '@/store';

import TaskForm from '@/components/taskFroms/TaskForm.vue'
import TaskList from '@/components/taskListComponents/TaskList.vue'

import { getTaskTypeIcon, getTaskForm, getTaskTypeArray } from '@/service/taskType';

interface GroupedTask {
  title: string,
  active: boolean,
  icon: string,
  tasks: Task[],
}

@Component({ components: { TaskList, TaskForm } })
export default class TaskView extends Vue {

  selectedTaskType: TaskType | null = null;

  showDialog = false;

  showEditDialog = false;
  taskToEdit: Task | null = null;
  editForm: string | null = null;

  get taskTypes() {
    return getTaskTypeArray();
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

  editTask(task: Task) {
    this.editForm = getTaskForm(task.type);
    this.taskToEdit = task;
    this.showEditDialog = true;
  }

}
</script>

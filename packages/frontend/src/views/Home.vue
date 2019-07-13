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
          <v-subheader inset>Tasks</v-subheader>
          <TaskListTile v-for="task in tasks" :key="task.id" :task="task" @delete="deleteTask" />
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Task, TaskType, MiningTask } from '@typescreeps/common';

import TaskListTile from '../components/TaskListTile.vue'
import MineTaskForm from '../components/taskFroms/MineTaskForm.vue'
import CarryTaskForm from '../components/taskFroms/CarryTaskForm.vue'

@Component({ components: { TaskListTile, MineTaskForm, CarryTaskForm } })
export default class Home extends Vue {


  tasks: Task[] | null = null;
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
      case TaskType.MINE: {
        return 'MineTaskForm';
        break;
      }
      case TaskType.CARRY: {
        return 'CarryTaskForm';
        break;
      }
      default: {
        console.error(`Task form for task type ${this.selectedTask} not found`);
        return null;
      }
    }
  }

  async created() {
    this.fetchTasks();
  }

  async fetchTasks() {
    this.tasks = await this.$api.getTasks();
  }

  async addTask(task: Task) {
    await this.$api.addTask(task);
    await this.fetchTasks();
    this.showDialog = false;
  }

  async deleteTask(taskId: string) {
    await this.$api.deleteTask(taskId);
    await this.fetchTasks();
  }

}
</script>

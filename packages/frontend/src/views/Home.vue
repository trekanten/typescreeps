<template>
  <v-layout row>
    <v-dialog v-model="showDialog" width="500">
      <MineTaskForm @newTask="addTask" />
    </v-dialog>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
      <v-card>
        <h3>Typescreeps</h3>
        <v-layout row>
          <v-flex offset-xs2 xs4>
            <v-select :items="taskTypes" label="Task Type"></v-select>
          </v-flex>
          <v-flex xs4>
            <v-btn color="success" @click="()=>this.showDialog = true">Add new task</v-btn>
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
import { Task, TaskType, MiningTask, validateTask, validateMiningTask } from '@typescreeps/common';

import TaskListTile from '../components/TaskListTile.vue'
import MineTaskForm from '../components/taskFroms/MineTaskForm.vue'

@Component({ components: { TaskListTile, MineTaskForm } })
export default class Home extends Vue {


  tasks: Task[] | null = null;
  showDialog = false;

  get taskTypes() {
    const taskTypes = [];
    for (var key in TaskType) {
      taskTypes.push(TaskType[key]);
    }
    return taskTypes;
  }

  async created() {
    this.fetchTasks();
  }

  async fetchTasks() {
    this.tasks = await this.$api.getTasks();
  }

  async addTask(task: Task) {
    try {
      validateTask(task);
      await this.$api.addTask(task);
      await this.fetchTasks();
      this.showDialog = false;
    } catch (error) {
      alert(error)
    }
  }

  async deleteTask(taskId: string) {
    await this.$api.deleteTask(taskId);
    await this.fetchTasks();
  }

}
</script>

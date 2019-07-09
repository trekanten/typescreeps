<template>
  <v-flex xs12 sm6 d-flex>
    <h1>Typescreeps</h1>
    <v-select :items="items" label="Task type"></v-select>
    <v-btn color="success" @click="addTask">Add task</v-btn>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Task } from '@typescreeps/common';

@Component
export default class Home extends Vue {

  private items = ['Mine', 'Build', 'Transport', 'Defend'];

  private tasks: Task[] | null = null;

  async created() {
    this.tasks = await this.$api.getTasks();
    console.log(this.tasks);
  }

  async addTask() {
    console.log('Adding task');
  }

}
</script>

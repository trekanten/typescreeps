<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon color="grey lighten-1">eject</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ task.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ task.type }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-btn icon ripple @click="deleteTask">
        <v-icon color="grey lighten-1">delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Task, TaskType, MineTask } from '@typescreeps/common';

@Component
export default class TaskListtile extends Vue {

  @Prop({ required: true })
  task!: Task;

  async deleteTask() {
    this.$emit('delete', this.task.name);
  }

}
</script>

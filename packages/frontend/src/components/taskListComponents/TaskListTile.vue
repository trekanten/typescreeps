<template>
  <v-list-tile avatar>
    <!-- <v-list-tile-avatar>
      <img :src="taskIcon" />
    </v-list-tile-avatar> -->

    <v-list-tile-content>
      <v-list-tile-title>{{ task.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ task.type }}</v-list-tile-sub-title>
      <v-list-tile-sub-title>
        <BodyPartList :bodyParts="task.bodyParts" />
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile v-for="(action, i) in actions" :key="i" @click="action.method">
            <v-list-tile-title>{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  </v-list-tile>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Task, TaskType, MineTask } from '@typescreeps/common';

import { getTaskTypeIcon } from '@/service/taskType';

import BodyPartList from '@/components/bodyPart/BodyPartList.vue'

@Component({ components: { BodyPartList } })
export default class TaskListtile extends Vue {

  @Prop({ required: true })
  task!: Task;

  actions = [
    {
      title: 'Edit (Under development)',
      method: this.editTask,
    },
    {
      title: 'Delete',
      method: this.deleteTask,
    },
  ]

  get taskIcon() {
    return getTaskTypeIcon(this.task.type);
  }

  editTask() {
    this.$emit('edit', this.task);
  }

  deleteTask() {
    this.$emit('delete', this.task);
  }

}
</script>

<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{route}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="goToTasks">Tasks</v-btn>
      <v-btn flat @click="goToLinks">Links</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ROUTE } from '../router';

@Component
export default class ToolBar extends Vue {

  get route() {
    return this.$route.name;
  }

  goToTasks() {
    this.$router.push({ name: ROUTE.TASKS });
  }

  goToLinks() {
    this.$router.push({ name: ROUTE.LINKS });
  }
}
</script>

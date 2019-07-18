<template>
  <div id="app">
    <v-app id="inspire">
      <ToolBar />
      <v-content>
        <v-container fluid>
          <keep-alive>
            <router-view />
          </keep-alive>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ToolBar from '@/components/Toolbar.vue'


@Component({ components: { ToolBar } })
export default class App extends Vue { }
</script>


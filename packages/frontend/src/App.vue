<template>
  <div id="app">
    <v-app id="inspire">
      <v-container fluid px-0>
        <router-view />
      </v-container>
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

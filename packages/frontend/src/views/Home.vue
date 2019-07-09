<template>
  <v-flex xs12 sm6 d-flex>
    <h1>Typescreeps</h1>
    <v-select :items="items" label="Task type"></v-select>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {

  private items = ['Mine', 'Build', 'Transport', 'Defend'];

}
</script>

<template>
  <v-combobox
    v-model="room"
    :items="rooms"
    v-bind="$attrs"
  ></v-combobox>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { store } from '@/store';

@Component
export default class RoomSelect extends Vue {

  room = ''
  rooms = store.rooms;

  @Watch('room')
  onRoomUpdated() {
    this.$emit('input', this.room)
  }
}
</script>

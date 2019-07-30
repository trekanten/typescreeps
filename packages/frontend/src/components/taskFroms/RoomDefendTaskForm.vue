<template>
  <div>
    <v-text-field
      label="Name"
      v-model="task.name"
      v-validate="'required|max:10'"
      :counter="10"
      :error-messages="errors.collect('name')"
      data-vv-name="name"
      required
    ></v-text-field>

    <BodyPartsSelect v-model="task.bodyParts" :preset="'mine'" />

    <RoomSelect
      label="Room"
      v-model="task.room"
      v-validate="'required|min:4|max:6'"
      :counter="6"
      :error-messages="errors.collect('room')"
      data-vv-name="room"
      required
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TaskFormTemplate from './TaskFormTemplate';

import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'
import RoomSelect from '@/components/formComponents/RoomSelect.vue'

@Component({ components: { BodyPartsSelect, RoomSelect } })
export default class RoomDefendTaskForm extends TaskFormTemplate { }
</script>
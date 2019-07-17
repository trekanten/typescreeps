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

    <BodyPartsSelect v-model="task.bodyParts" :preset="'upgrade'" />

    <RoomSelect
      label="Room"
      v-model="task.room"
      v-validate="'required|min:4|max:6'"
      :counter="6"
      :error-messages="errors.collect('room')"
      data-vv-name="room"
      required
    />

    <v-text-field
      label="Container ID"
      v-model="task.containerId"
      v-validate="'min:24|max:24'"
      :counter="24"
      :error-messages="errors.collect('containerId')"
      data-vv-name="containerId"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TaskFormTemplate from './TaskFormTemplate';

import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'
import RoomSelect from '@/components/formComponents/RoomSelect.vue'

@Component({ components: { BodyPartsSelect, RoomSelect } })
export default class ClaimTaskForm extends TaskFormTemplate { }
</script>
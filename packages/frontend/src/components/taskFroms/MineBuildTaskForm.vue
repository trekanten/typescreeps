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

    <v-text-field
      label="Source ID"
      v-model="task.sourceId"
      v-validate="'required|min:24|max:24'"
      :counter="24"
      :error-messages="errors.collect('sourceId')"
      data-vv-name="sourceId"
      required
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TaskFormTemplate from './TaskFormTemplate';
import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'

@Component({ components: { BodyPartsSelect } })
export default class CarryTaskForm extends TaskFormTemplate { }
</script>
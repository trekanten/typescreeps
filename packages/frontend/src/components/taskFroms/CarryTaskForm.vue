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

    <BodyPartsSelect v-model="task.bodyParts" />

    <v-text-field
      label="Carry from"
      v-model="task.from"
      v-validate="'required|min:24|max:24'"
      :counter="24"
      :error-messages="errors.collect('from')"
      data-vv-name="from"
      required
    ></v-text-field>

    <v-text-field
      label="Carry to"
      v-model="task.to"
      v-validate="'required|min:24|max:24'"
      :counter="24"
      :error-messages="errors.collect('to')"
      data-vv-name="to"
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
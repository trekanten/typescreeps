<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Repair Task</v-card-title>

    <v-flex xs10 offset-xs1>
      <form>
        <v-text-field
          label="Name"
          v-model="name"
          v-validate="'required|max:10'"
          :counter="10"
          :error-messages="errors.collect('name')"
          data-vv-name="name"
          required
        ></v-text-field>

        <BodyPartsSelect v-model="bodyParts" :preset="'mine'" />

        <v-text-field
          label="Source ID"
          v-model="sourceId"
          v-validate="'required|min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('sourceId')"
          data-vv-name="sourceId"
          required
        ></v-text-field>

        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">Add Task</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TaskType, BodyPart, MineBuildTask, RepairTask } from '@typescreeps/common';

import { bodyPartPresets } from '../bodyPart/bodyPartPresets';

import BodyPartsSelect from '../bodyPart/BodyPartsSelect.vue'

@Component({ components: { BodyPartsSelect } })
export default class MineTaskForm extends Vue {

  name = '';
  bodyParts = null;
  sourceId = '';

  dictionary = {
    custom: {
      name: {
        required: () => 'Name can not be empty',
        max: 'The name field may not be greater than 10 characters'
        // custom messages
      },
    }
  }

  async submit() {
    try {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        throw Error('RepairTask not valid');
      }
      if (!this.bodyParts) {
        throw Error('RepairTask missing body parts');
      }

      const RepairTask: RepairTask = {
        name: this.name,
        type: TaskType.REPAIR,
        bodyParts: this.bodyParts as unknown as BodyPart[],
        sourceId: this.sourceId,
      }

      this.$emit('newTask', RepairTask);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    this.name = ''
    this.sourceId = ''
    this.$validator.reset()
  };
}
</script>
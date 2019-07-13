<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Carry Task</v-card-title>

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

        <BodyPartsSelect v-model="bodyParts" :preset="'carry'" />

        <v-text-field
          label="Carry from"
          v-model="from"
          v-validate="'required|min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('from')"
          data-vv-name="from"
          required
        ></v-text-field>

        <v-text-field
          label="Carry to"
          v-model="to"
          v-validate="'required|min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('to')"
          data-vv-name="to"
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
import { TaskType, CarryTask, BodyPart } from '@typescreeps/common';

import BodyPartsSelect from '../bodyPart/BodyPartsSelect.vue'

@Component({ components: { BodyPartsSelect } })
export default class CarryTaskForm extends Vue {

  name = '';
  bodyParts = null;
  to = '';
  from = '';

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
        throw Error('Carry taks not valid');
      }
      if (!this.bodyParts) {
        throw Error('Mining task missing body parts');
      }

      const carryTask: CarryTask = {
        name: this.name,
        type: TaskType.CARRY,
        bodyParts: this.bodyParts as unknown as BodyPart[],
        to: this.to,
        from: this.from,
      }

      this.$emit('newTask', carryTask);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    this.name = ''
    this.to = ''
    this.from = ''
    this.$validator.reset()
  };
}
</script>
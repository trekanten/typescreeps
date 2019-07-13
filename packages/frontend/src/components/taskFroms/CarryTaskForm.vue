<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Carry Task</v-card-title>

    <v-flex xs10 offset-xs1>
      <form>
        <v-text-field
          label="Task Name"
          v-model="name"
          v-validate="'required|max:10'"
          :counter="10"
          :error-messages="errors.collect('name')"
          data-vv-name="name"
          required
        ></v-text-field>
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
        <v-text-field
          label="Creep Name"
          v-model="creepName"
          v-validate="'required|min:5|max:15'"
          :counter="15"
          :error-messages="errors.collect('creepName')"
          data-vv-name="creepName"
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
import { TaskType, CarryTask } from '@typescreeps/common';

@Component
export default class CarryTaskForm extends Vue {

  name = '';
  to = '';
  from = '';
  creepName = '';

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

      const carryTask: CarryTask = {
        id: this.name,
        type: TaskType.CARRY,
        to: this.to,
        from: this.from,
        creepName: this.creepName,
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
    this.creepName = ''
    this.$validator.reset()
  };
}
</script>
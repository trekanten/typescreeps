<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Mining Task</v-card-title>

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
          label="Source ID"
          v-model="sourceId"
          v-validate="'required|min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('sourceId')"
          data-vv-name="sourceId"
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
import { MiningTask, validateMiningTask, TaskType } from '@typescreeps/common';

@Component
export default class MineTaskForm extends Vue {

  name = '';
  sourceId = '';
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
        throw Error('Mining taks not valid');
      }

      const miningTask = {
        id: this.name,
        type: TaskType.MINE,
        sourceId: this.sourceId,
        creepName: this.creepName,
      }
      validateMiningTask(miningTask);

      this.$emit('newTask', miningTask);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    this.name = ''
    this.sourceId = ''
    this.creepName = ''
    this.$validator.reset()
  };
}
</script>
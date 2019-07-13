<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Upgrade Task</v-card-title>

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
        <v-text-field
          label="Room"
          v-model="room"
          v-validate="'required|min:4|max:6'"
          :counter="6"
          :error-messages="errors.collect('room')"
          data-vv-name="room"
          required
        ></v-text-field>
        <v-text-field
          label="Source ID"
          v-model="sourceId"
          v-validate="'min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('sourceId')"
          data-vv-name="sourceId"
        ></v-text-field>
        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">Add Task</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UpgradeTask, TaskType } from '@typescreeps/common';

@Component
export default class BuildTaskForm extends Vue {

  name = '';
  room = '';
  sourceId = undefined;

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
        throw Error('Upgrade task not valid');
      }

      const upgradeTask: UpgradeTask = {
        name: this.name,
        type: TaskType.UPGRADE,
        room: this.room,
        sourceId: this.sourceId,
      }

      this.$emit('newTask', upgradeTask);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    this.name = ''
    this.room = ''
    this.sourceId = undefined
    this.$validator.reset()
  };
}
</script>
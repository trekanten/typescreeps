<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Spawn Distributor Task</v-card-title>

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

        <RoomSelect
          label="Room"
          v-model="room"
          v-validate="'required|min:4|max:6'"
          :counter="6"
          :error-messages="errors.collect('room')"
          data-vv-name="room"
          required
        />

        <v-text-field
          label="Container ID"
          v-model="containerId"
          v-validate="'min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('containerId')"
          data-vv-name="containerId"
        ></v-text-field>

        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">Add Task</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SpawnDistributorTask, TaskType, BodyPart } from '@typescreeps/common';

import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'
import RoomSelect from '@/components/formComponents/RoomSelect.vue'

@Component({ components: { BodyPartsSelect, RoomSelect } })
export default class BuildTaskForm extends Vue {

  name = '';
  bodyParts = null;
  room = '';
  containerId = '';

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
        throw Error('Spawn Distributor task not valid');
      }
      if (!this.bodyParts) {
        throw Error('Spawn Distributor task missing body parts');
      }

      const spawnDistributionTask: SpawnDistributorTask = {
        name: this.name,
        type: TaskType.SPAWN_DISTRIBUTOR,
        bodyParts: this.bodyParts as unknown as BodyPart[],
        room: this.room,
        containerId: this.containerId === '' ? undefined : this.containerId,
      }

      this.$emit('submit', spawnDistributionTask);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    this.name = ''
    this.room = ''
    this.containerId = ''
    this.$validator.reset()
  };
}
</script>
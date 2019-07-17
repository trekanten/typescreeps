<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Carry Task</v-card-title>

    <v-flex xs10 offset-xs1>
      <form>
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

        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">Add Task</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TaskType, CarryTask, BodyPart, Task } from '@typescreeps/common';

import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'

@Component({ components: { BodyPartsSelect } })
export default class CarryTaskForm extends Vue {

  @Prop()
  originalTask!: CarryTask | undefined;

  created() {
    this.init();
  }

  activated() {
    this.init();
  }

  init() {
    if (this.originalTask) {
      this.task = JSON.parse(JSON.stringify(this.originalTask))
    }
  }

  task: CarryTask = {
    type: TaskType.CARRY,
    name: '',
    bodyParts: [],
    to: '',
    from: '',
  }

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
      if (this.task.bodyParts.length === 0) {
        throw Error('Carry task missing body parts');
      }

      this.$emit('submit', this.task);
    } catch (error) {
      console.error(error);
    }

  };
  clear() {
    if (this.originalTask) {
      this.task = JSON.parse(JSON.stringify(this.originalTask))
    } else {
      this.task.name = ''
      this.task.bodyParts = []
      this.task.to = ''
      this.task.from = ''
    }
    this.$validator.reset()
  };
}
</script>
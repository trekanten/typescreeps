<template>
  <div v-if="task">
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TaskType, CarryTask, BodyPart, Task } from '@typescreeps/common';

import { ITaskForm } from './ITaskForm';

import BodyPartsSelect from '@/components/formComponents/BodyPartsSelect.vue'
import { value } from 'vue-function-api';

@Component({ components: { BodyPartsSelect } })
export default class CarryTaskForm extends Vue implements ITaskForm<CarryTask> {

  @Prop({ required: true })
  value!: CarryTask;

  @Watch('value', { deep: true, immediate: true })
  onChanged(newValue: CarryTask) {
    this.task = newValue;
  }

  task: CarryTask = this.value;

  @Watch('task', { deep: true })
  onTask() {
    if (this.task) {
      this.$emit('input', this.task);
    }
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

  async validate() {
    return await this.$validator.validateAll();
  }

  async reset(task: CarryTask) {
    this.task = task;
    this.$validator.reset();
  }
}
</script>
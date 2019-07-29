<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>{{title}}</v-card-title>

    <v-flex xs10 offset-xs1>
      <form>
        <component :is="taskForm" v-model="task" ref="form" />

        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">{{submitText}}</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TaskType, CarryTask, BodyPart, Task } from '@typescreeps/common';
import { getTaskForm, getEmptyTask } from '@/service/taskType';

import BuildTaskForm from './BuildTaskForm.vue'
import CarryTaskForm from './CarryTaskForm.vue'
import ClaimTaskForm from './ClaimTaskForm.vue'
import MineTaskForm from './MineTaskForm.vue'
import MineBuildTaskForm from './MineBuildTaskForm.vue'
import RepairTaskForm from './RepairTaskForm.vue'
import ReserveTaskForm from './ReserveTaskForm.vue'
import RoomDefendTaskForm from './RoomDefendTaskForm.vue'
import SpawnDistributorTaskForm from './/SpawnDistributorTaskForm.vue'
import UpgradeTaskForm from './UpgradeTaskForm.vue'
import { ITaskForm } from './ITaskForm';

@Component({ components: { BuildTaskForm, CarryTaskForm, ClaimTaskForm, MineTaskForm, MineBuildTaskForm, RepairTaskForm, ReserveTaskForm, RoomDefendTaskForm, SpawnDistributorTaskForm, UpgradeTaskForm } })
export default class TaskForm extends Vue {

  @Prop({ required: true })
  taskType!: TaskType;

  @Prop()
  originalTask!: Task | undefined;

  task: Task | null = null;

  get taskForm() {
    return getTaskForm(this.taskType);
  }

  created() {
    this.init();
  }

  activated() {
    this.init();
  }

  init() {
    if (this.originalTask) {
      this.task = JSON.parse(JSON.stringify(this.originalTask));
    } else {
      this.task = JSON.parse(JSON.stringify(getEmptyTask(this.taskType)));
    }
  }

  async submit() {
    if (!this.task) {
      throw Error('No task found!');
    }
    try {
      const valid = await this.form.validate();
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
    let clearedTask;
    if (this.originalTask) {
      clearedTask = JSON.parse(JSON.stringify(this.originalTask))
    } else {
      clearedTask = JSON.parse(JSON.stringify(getEmptyTask(this.taskType)));
    }
    this.form.reset(clearedTask);
  };

  get form() {
    return this.$refs.form as unknown as ITaskForm<Task>;
  }

  get title() {
    if (this.originalTask) {
      return `Update ${this.taskType.toUpperCase()} task`;
    }
    return `New ${this.taskType.toUpperCase()} task`;
  }

  get submitText() {
    if (this.originalTask) {
      return `UPDATE TASK`;
    }
    return `ADD TASK`;
  }
}
</script>
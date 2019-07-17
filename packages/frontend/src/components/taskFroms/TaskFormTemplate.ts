import { Vue, Prop, Watch } from 'vue-property-decorator';
import { Task } from '@typescreeps/common';

export interface ITaskFormTemplate<T extends Task> {
  task: T;

  validate: () => Promise<boolean>;
  reset: (task: T) => void;
}

export default class TaskFormTemplate extends Vue implements ITaskFormTemplate<Task> {

  @Prop({ required: true })
  value!: Task;

  @Watch('value', { deep: true, immediate: true })
  onChanged(newValue: Task) {
    this.task = newValue;
  }

  task: Task = this.value;

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
        max: 'The name field may not be greater than 10 characters',
        // custom messages
      },
    },
  };

  async validate() {
    return await this.$validator.validateAll();
  }

  async reset(task: Task) {
    this.task = task;
    this.$validator.reset();
  }
}

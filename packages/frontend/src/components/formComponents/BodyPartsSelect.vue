<template>
  <div>
    <BodyPartBuilder
      v-if="useCustomBodyParts"
      v-model="builderBodyParts"
    />

    <!-- <v-checkbox v-model="useCustomBodyParts" label="Use custom body parts"></v-checkbox> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { TaskType, BodyPart } from '@typescreeps/common';

import BodyPartBuilder from '@/components/bodyPart/BodyPartBuilder.vue'

@Component({ components: { BodyPartBuilder } })
export default class BodyPartsSelect extends Vue {

  @Prop()
  value!: BodyPart[];

  builderBodyParts: BodyPart[] = []

  @Watch('builderBodyParts')
  bbpUpdated(newBodyParts: BodyPart[]) {
    this.$emit('input', newBodyParts);
  }

  useCustomBodyParts = true;

  created() {
    this.init();
  }

  activated() {
    this.init();
  }

  init() {
    if (this.value) {
      this.builderBodyParts = this.value;
      this.useCustomBodyParts = true;
    }
  }
}
</script>

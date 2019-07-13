<template>
  <div>
    <v-select
      v-if="!useCustomBodyParts"
      label="Body Parts"
      v-model="selectedPresetName"
      :items="bodyPartPresets.map(bpp => bpp.name)"
      required
    ></v-select>
    <BodyPartList v-if="!useCustomBodyParts && bodyParts" :bodyParts="bodyParts" />
    <BodyPartBuilder v-if="useCustomBodyParts" @updated="updateBodyParts" />
    <v-checkbox v-model="useCustomBodyParts" label="Use custom body parts"></v-checkbox>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { TaskType, BodyPart } from '@typescreeps/common';

import { bodyPartPresets } from './bodyPartPresets';

import BodyPartList from './BodyPartList.vue'
import BodyPartBuilder from './BodyPartBuilder.vue'


@Component({ components: { BodyPartList, BodyPartBuilder } })
export default class BodyPartsSelect extends Vue {

  private bodyPartPresets = bodyPartPresets;

  @Prop()
  value!: BodyPart[] | null;

  @Prop()
  preset?: TaskType;

  @Watch('useCustomBodyParts')
  onUCBPChanged() {
    if (!this.useCustomBodyParts) {
      this.updateBodyParts(this.bodyParts);
    }
  }

  useCustomBodyParts = false;

  selectedPresetName: string | null = null;

  get bodyParts() {
    const preset = bodyPartPresets.find(bpp => bpp.name === this.selectedPresetName);
    const presetParts = preset ? preset.bodyParts : null;
    this.updateBodyParts(presetParts);
    return presetParts
  }

  created() {
    if (this.preset) {
      this.selectedPresetName = this.preset;
    }
  }

  updateBodyParts(bodyParts: BodyPart[] | null) {
    this.$emit('input', bodyParts)
  }

}
</script>

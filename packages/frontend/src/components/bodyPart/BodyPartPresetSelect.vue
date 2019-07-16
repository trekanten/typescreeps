<template>
  <div>
    <v-select
      label="Body Parts"
      v-model="selectedPresetName"
      :items="bodyPartPresets.map(bpp => bpp.name)"
      required
    ></v-select>
    <BodyPartList v-if="bodyParts" :bodyParts="bodyParts" />
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BodyPart } from '@typescreeps/common';

import { bodyPartPresets } from '../bodyPart/bodyPartPresets';

import BodyPartList from '@/components/bodyPart/BodyPartList.vue'

@Component({ components: { BodyPartList } })
export default class BodyPartPresetSelect extends Vue {

  private bodyPartPresets = bodyPartPresets;

  @Prop()
  value!: BodyPart[];

  selectedPresetName: string | null = null;

  get bodyParts() {
    const preset = bodyPartPresets.find(bpp => bpp.name === this.selectedPresetName);
    const presetParts = preset ? preset.bodyParts : [];
    this.$emit('input', presetParts);
    return presetParts
  }

}
</script>
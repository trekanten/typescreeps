<template>
  <div>
    <!-- <v-select
      v-if="!useCustomBodyParts"
      label="Body Parts"
      v-model="selectedPresetName"
      :items="bodyPartPresets.map(bpp => bpp.name)"
      required
    ></v-select>
    <BodyPartList v-if="!useCustomBodyParts && bodyParts" :bodyParts="bodyParts" /> -->

    <BodyPartBuilder v-model="builderBodyParts" v-if="useCustomBodyParts" />

    <v-checkbox v-model="useCustomBodyParts" label="Use custom body parts"></v-checkbox>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { TaskType, BodyPart } from '@typescreeps/common';

import { bodyPartPresets } from '../bodyPart/bodyPartPresets';

import BodyPartList from '../bodyPart/BodyPartList.vue'
import BodyPartBuilder from '../bodyPart/BodyPartBuilder.vue'

@Component({ components: { BodyPartList, BodyPartBuilder } })
export default class BodyPartsSelect extends Vue {

  private bodyPartPresets = bodyPartPresets;

  @Prop()
  value!: BodyPart[];

  @Watch('value')
  onValueChanged(newValue: BodyPart[]) {
    console.log('value updated');
    this.builderBodyParts = newValue;
  }

  @Prop()
  preset?: TaskType;

  selectedPresetName: string | null = null;

  builderBodyParts: BodyPart[] = []
  @Watch('builderBodyParts')
  onBBPChanged(value: BodyPart[]) {
    
    console.log('builderBodyParts updated!');
  }

  useCustomBodyParts = false;
  @Watch('useCustomBodyParts')
  onUCBPChanged() {
    if (!this.useCustomBodyParts) {
      this.updateBodyParts(this.bodyParts);
    }
  }

  created() {
    this.init();
  }

  activated() {
    this.init();
  }

  init() {
    if (this.value) {
      this.useCustomBodyParts = true;
      // this.updateBodyParts(this.value)
      // console.log('Value');
    // } else if (this.preset) {
    //   this.selectedPresetName = this.preset;
    }
  }

  get bodyParts() {
    const preset = bodyPartPresets.find(bpp => bpp.name === this.selectedPresetName);
    const presetParts = preset ? preset.bodyParts : null;
    this.updateBodyParts(presetParts);
    return presetParts
  }

  updateBodyParts(bodyParts: BodyPart[] | null) {
    this.$emit('input', bodyParts)
  }

}
</script>

<template>
  <div class="bodypart-builder">
    <h5>Body parts. Total cost: {{totalCost}}</h5>
    <div v-for="bodyPart in bodyPartEnum" :key="bodyPart">
      <h6>{{bodyPart}}</h6>
      <div class="bodypart-row">
        <div class="bodypart remove" @click="removeBodyPart(bodyPart)"></div>
        <div
          class="bodypart selected"
          v-for="c in (bodyParts.filter(bp => bp === bodyPart).length)"
          :style="{background: getBodyPartColor(bodyPart)}"
          :key="`${bodyPart}-${c}-selected`"
          @click="setBodyPart(bodyPart, c)"
        ></div>
        <div
          class="bodypart"
          v-for="c in (10 - (bodyParts.filter(bp => bp === bodyPart).length))"
          :key="`${bodyPart}-${c}`"
          @click="addBodyPart(bodyPart, c)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bodypart-builder {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.bodypart-row {
  display: flex;
  flex-direction: row;
  .bodypart {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #000;
    margin-left: 1px;
    border: #333 solid 2px;

    &.remove {
      background: #bd0d16;
    }
  }
}
</style>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import { BodyPart, getTotalBodyPartCost } from '@typescreeps/common';

import { getBodyPartColor } from './bodyPart';

import BodyPartList from './BodyPartList.vue'

@Component({ components: { BodyPartList } })
export default class BodyPartBuilder extends Vue {

  // External features
  BodyPart = BodyPart;
  getBodyPartColor = getBodyPartColor;

  @Prop({ required: true })
  value!: BodyPart[]

  @Watch('value')
  valueUpdated(newValue: BodyPart[]){
    this.bodyParts = this.value;
  }

  bodyParts: BodyPart[] = [];

  created() {
    this.bodyParts = this.value;
  }

  get bodyPartEnum() {
    const bodyParts = [];
    for (const key in BodyPart) {
      bodyParts.push(BodyPart[key]);
    }
    return bodyParts;
  }

  get totalCost() {
    return getTotalBodyPartCost(this.bodyParts);
  }

  setBodyPart(bodyPart: BodyPart, count: number) {
    this.removeBodyPart(bodyPart);
    this.addBodyPart(bodyPart, count);
  }

  addBodyPart(bodyPart: BodyPart, count: number) {
    for (let i = 0; i < count; i++) {
      this.bodyParts.push(bodyPart);
      this.bodyParts = this.bodyParts.sort();
      this.$emit('input', this.bodyParts);
    }
  }

  removeBodyPart(bodyPart: BodyPart) {
    this.bodyParts = this.bodyParts.filter(bp => bp !== bodyPart);
    this.$emit('input', this.bodyParts);
  }
}
</script>


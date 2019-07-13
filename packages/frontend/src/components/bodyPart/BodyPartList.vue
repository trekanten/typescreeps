<template>
  <div class="bodypart-row">
    <div
      class="bodypart selected tooltip"
      v-for="(bp, index) in bodyParts"
      :style="{background: getBodyPartColor(bp)}"
      :key="index"
    >
      <span class="tooltiptext">{{bp}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  }
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>


<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { BodyPart } from '@typescreeps/common';

import { getBodyPartCost, getBodyPartColor } from './bodyPart';

@Component
export default class BodyPartList extends Vue {

  @Prop({ required: true })
  bodyParts!: BodyPart[];

  get sortedBodyParts() {
    return this.bodyParts.sort();
  }

  getBodyPartColor = getBodyPartColor;
}
</script>


<template>
  <div class="bodypart-builder">
    <h5>Body parts. Total cost: {{totalCost}}</h5>
    <div v-for="(bodyPart) in BodyPart" :key="bodyPart">
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
          v-for="c in (maxParts - (bodyParts.filter(bp => bp === bodyPart).length))"
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
import { value, Wrapper, computed, watch } from 'vue-function-api';
import { BodyPart, getTotalBodyPartCost } from '@typescreeps/common';

import { getBodyPartColor } from './bodyPart';

import BodyPartList from './BodyPartList.vue'

export default Vue.extend({
  components: {
    BodyPartList
  },
  data: function () {
    return {
      BodyPart: BodyPart,
      maxParts: 10,
    }
  },
  setup(_, context) {

    const bodyParts: Wrapper<BodyPart[]> = value([BodyPart.MOVE, BodyPart.MOVE, BodyPart.WORK]);

    watch(
      () => bodyParts.value,
      (value, oldValue) => {
        context.emit('updated', value);
      }
    )
    const totalCost = computed(() => {
      return getTotalBodyPartCost(bodyParts.value);
    })

    const setBodyPart = (bodyPart: BodyPart, count: number) => {
      removeBodyPart(bodyPart);
      addBodyPart(bodyPart, count);
    };

    const addBodyPart = (bodyPart: BodyPart, count: number) => {
      for (let i = 0; i < count; i++) {
        bodyParts.value.push(bodyPart);
        bodyParts.value = bodyParts.value.sort();
      }
    };

    const removeBodyPart = (bodyPart: BodyPart) => {
      bodyParts.value = bodyParts.value.filter(bp => bp !== bodyPart)
    };

    return {
      bodyParts,
      totalCost,
      setBodyPart,
      addBodyPart,
      removeBodyPart,
      getBodyPartColor,
    };
  },
})
</script>


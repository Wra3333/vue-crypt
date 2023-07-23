<script setup>
import Cross from '@/components/icons/Cross.vue'

import { computed, ref, toRefs } from 'vue';

defineEmits(['closeDiagram'])
const props = defineProps(['selectedTicker','masGraphPrice'])
const {selectedTicker,masGraphPrice} = toRefs(props)

const diagramColums = ref(null)

defineExpose({
  diagramColums
})

const normalizeGraph = computed(() =>{
      let maxValue = Math.max(...masGraphPrice.value);
      let minValue = Math.min(...masGraphPrice.value);
      if (maxValue === minValue) {
        return masGraphPrice.value.map(() => 50);
      }

      return masGraphPrice.value.map(price => {
        return 25+((price - minValue) * 75) / (maxValue - minValue)
      });

})

</script>
<template>
    <section class="relative"  v-if="selectedTicker">
      <h3 class="diagram__title">
        {{selectedTicker.currency}} - {{selectedTicker.name }}
      </h3>
      <div 
        class="diagram__colums" 
        ref="diagramColums"
      >
        <div
          v-for="(item,index) of normalizeGraph"
          :key="index"
          :style="{ height: `${item}%` }"
          class="bg-purple-800 border w-3.5 "
        >
        </div>
      </div>
      <button type="button" class="diagram__close" @click="$emit('closeDiagram')">
      <Cross/>
      </button>
    </section>
</template>
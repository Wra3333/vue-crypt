<script setup>
import Cross from '@/components/icons/Cross.vue'

import { computed, onMounted, ref, toRefs } from 'vue';
defineEmits(['closeDiagram'])
const props = defineProps(['selectedTicker','graph'])
const {selectedTicker,graph} = toRefs(props)

const diagramColums = ref(null)

defineExpose({
  diagramColums
})

const normalizeGraph = computed(() =>{
      let maxValue = Math.max(...graph.value);
      let minValue = Math.min(...graph.value);
      if (maxValue === minValue) {
        return graph.value.map(() => 50);
      }

      return graph.value.map(price => {
        return 5 + ((price - minValue) * 95) / (maxValue - minValue)
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
          class="bg-purple-800 border w-10 "
        >
        </div>
      </div>
      <button type="button" class="diagram__close" @click="$emit('closeDiagram')">
      <Cross/>
      </button>
    </section>
</template>
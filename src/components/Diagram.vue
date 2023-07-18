<script setup>
import Cross from '@/components/icons/Cross.vue'

import { toRefs } from 'vue';
defineEmits(['closeDiagram'])
const props = defineProps(['selectedTicker'])
const {selectedTicker} = toRefs(props)

</script>
<template>
    <section class="relative"  v-if="selectedTicker">
      <h3 class="diagram__title">
        {{selectedTicker.currency}} - {{selectedTicker.name }}
      </h3>
      <div class="diagram__colums">
        <div
          class="bg-purple-800 border w-10 h-24 outline-solid ot"
        ></div>
        <div
          class="bg-purple-800 border w-10 h-32"
        ></div>
        <div
          class="bg-purple-800 border w-10 h-48"
        ></div>
        <div
          class="bg-purple-800 border w-10 h-16"
        ></div>
      </div>
      <button type="button" class="diagram__close" @click="$emit('closeDiagram')">
      <Cross/>
      </button>
    </section>
</template>
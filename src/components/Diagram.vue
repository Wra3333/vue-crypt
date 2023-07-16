<script setup>
import Cross from '@/components/icons/Cross.vue'

import { toRefs } from 'vue';

const props = defineProps(['selectedTicker'])
const {selectedTicker} = toRefs(props)

</script>
<template>
    <section class="relative"  v-if="selectedTicker">
      <h3 class="diagram__title">
        USD - {{selectedTicker }}
      </h3>
      <div class="diagram__colums">
        <div
          class="bg-purple-800 border w-10 h-24"
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
      <button type="button" class="diagram__close">
      <Cross/>
      </button>
    </section>
</template>
<script setup>
import { toRefs } from 'vue';

defineEmits(['setPage'])
const props = defineProps(['createdTickers','endIndex','page','filterNameTicker'])


const {createdTickers,page,endIndex} = toRefs(props)

</script>
<template>
  <div class="pagination" v-if="createdTickers?.length > 6">
    <button class="pagination__button" :disabled="!(page > 1)" @click="$emit('setPage', false)">
      Назад
    </button>
    <button class="pagination__button" :disabled="!(createdTickers.length > endIndex)" @click="$emit('setPage', true)">
      Вперед
    </button>
  </div>
</template>
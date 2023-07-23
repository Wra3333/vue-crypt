<!-- eslint-disable-next-line -->
<script setup>
import { toRefs } from 'vue';

defineEmits(['setPage'])
const props = defineProps(['filterList', 'endIndex', 'page', 'filterNameTicker'])


const { filterList, page, endIndex } = toRefs(props)

</script>
<template>
  <div class="pagination" v-if="filterList?.length > 6">
    <button class="pagination__button" :disabled="!(page > 1)" @click="$emit('setPage', false)">
      Назад
    </button>
    <button class="pagination__button" :disabled="!(filterList.length > endIndex)" @click="$emit('setPage', true)">
      Вперед
    </button>
  </div>
</template>
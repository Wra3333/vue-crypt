<script setup>
import { toRefs } from 'vue';

defineEmits(['setPage'])
const props = defineProps(['createdTickers'])
const {createdTickers} = toRefs(props)

</script>
<template>
  <div class="pagination" v-if="createdTickers?.length >= 6">
    <button class="pagination__button" @click="$emit('setPage', false)">
      Назад
    </button>
    <button class="pagination__button" @click="$emit('setPage', true)">
      Вперед
    </button>
  </div>
</template>
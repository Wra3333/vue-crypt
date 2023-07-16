<script setup>
import Plus from '@/components/icons/Plus.vue'

import { computed, ref, toRefs } from 'vue'

defineEmits(['addTicker'])
const props = defineProps(['isDuplicateTicker','allTickers'])
const {isDuplicateTicker,allTickers} = toRefs(props)

const name = ref('')

const searhData = computed(() => {
  let newMas = allTickers.value?.filter(item => item.toLowerCase().includes(name.value.toLowerCase()))
  if (newMas?.length > 10) newMas.length = 10
  return newMas;
})

</script>
<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="dashboard__label">Тикер</label>
        <div class="dashboard__input-wrapper">
          <input type="text" @keyup.enter="$emit('addTicker', name)" v-model="name"
            name="wallet" autocomplete="no" class="dashboard__input"
            placeholder="Например DOGE" />
        </div>
        <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
          <button
            class="dashboard__buttons"
            v-for="(item, id) of searhData" :key="id" @click="$emit('addTicker', item)">
            {{ item }}
          </button>
        </div>
        <div class="dashboard__text-error" v-if="isDuplicateTicker">Это тикер уже добавлен</div>
      </div>
    </div>
    <button @click="$emit('addTicker', name)" 
      type="button"  class="dashboard__button">
      <Plus/>
      Добавить
    </button>
  </section>
</template>
<script setup>
import Plus from '@/components/icons/Plus.vue'

import { computed, ref, toRefs } from 'vue'

defineEmits(['addTicker','setActiveCurrecy'])
const props = defineProps(['isDuplicateTicker', 'allTickers','topListTickers'])
const { isDuplicateTicker, allTickers } = toRefs(props);

const tickerName = ref('');
const activeCurrency = ref(0);
const currencyData = ['USD', 'RUB', 'EUR', 'JPY', 'UAH', 'TRY'];

const searchCoins = computed(() => {

  if (tickerName.value == '') return props.topListTickers

  const tickerRegex = new RegExp(`^${tickerName.value}.`, "is");
  const exactTickerRegex = new RegExp(`^${tickerName.value}$`, "i");
  let count = 0;

  const filteredCoins = allTickers.value?.filter( item => {
    const isPartialMatch = tickerRegex.test(item);
    const isExactMatch = exactTickerRegex.test(item);

    if (count <= 10 && isPartialMatch) {
      count++;
      return true;
    }

    return isExactMatch;

  });

  return filteredCoins;
});
function setActiveCurrecy(id) {
  activeCurrency.value = id
}

</script>
<template>
  <section class="dashboard">
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="dashboard__label">Тикер</label>
        <div class="dashboard__currencies">
          <div class="dashboard__hint">
            <button 
              v-for="(item, id) of currencyData" 
              class="dashboard__currency" 
              :key="id"
              @click="setActiveCurrecy(id), $emit('setActiveCurrecy', item)"
              :class="{ '!bg-gray-600  !text-white': activeCurrency == id }">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="dashboard__input-wrapper">

          <input 
            @keyup.enter="$emit('addTicker', tickerName, currencyData[activeCurrency.value])" 
            v-model="tickerName"
            name="wallet" 
            autocomplete="no" 
            class="dashboard__input" 
            type="text" 
            placeholder="Например DOGE" 
          />
        </div>

        <div class="dashboard__hint" v-if="allTickers">
          <button 
            class="dashboard__hints" 
            v-for="(item, id) of searchCoins" 
            :key="id"
            @click="$emit('addTicker', item, currencyData[activeCurrency])">
            {{ item }}
          </button>
        </div>
        <div class="dashboard__text-error" v-if="isDuplicateTicker">Это тикер уже добавлен</div>
      </div>
    </div>
    <button 
      @click="$emit('addTicker', tickerName, currencyData[activeCurrency])" 
      type="button"
      class="dashboard__button"
    >
      <Plus />
      Добавить
    </button>
  </section>
</template>
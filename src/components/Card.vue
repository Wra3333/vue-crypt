<script setup>
import Basket from '@/components/icons/Basket.vue'

import { toRefs } from 'vue';

defineEmits(['removeTicker','selectTicker'])
const props = defineProps(['name','course','currency'])
const {name,course} = toRefs(props)
const {currency} = props


function formatPrice(price) {
      if(price == '-' || price == 'not coins') return price;
      const res = price < 1?Number(price).toFixed(2):Number(price).toFixed();
      return String(res).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

</script>
<template>
    <div
      @click="$emit('selectTicker')"  
      @keyup.enter="$emit('selectTicker')"  
      class="card"
    >
        <div class="card__subtitle">
            <dt class="card__name">
                {{ name +'-'+ currency}}
            </dt>
            <dd class="card__course">
               {{ formatPrice(course) }}
            </dd>
        </div>
        <div class="card__line"></div>
        <button
          @click.stop="$emit('removeTicker')" 
          @keyup.enter.stop
          type="button" 
          class="card__button"
        >
        <basket/>
         Удалить
        </button>
    </div>
</template>
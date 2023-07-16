<script setup>
import Basket from '@/components/icons/Basket.vue'


import { toRefs } from 'vue';

defineEmits(['removeTicker','selectTicker'])
const props = defineProps(['name','course'])
const {name,course} = toRefs(props)


</script>
<template>
    <div class="card" @click="$emit('selectTicker')">
        <div class="card__subtitle">
            <dt class="card__name">
                {{ name}}
            </dt>
            <dd class="card__course">
               {{ course }}
            </dd>
        </div>
        <div class="card__line"></div>
        <button
        @click="$emit('removeTicker', name )" 
        type="button" class="card__button">
        <basket/>
         Удалить
        </button>
    </div>
</template>
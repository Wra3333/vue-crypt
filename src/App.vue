<script setup>
import Card from '@/components/Card.vue';
import Diagram from '@/components/Diagram.vue';
import Dashboard from '@/components/Dashboard.vue';

import { onMounted, ref, computed, watch } from 'vue';

const createdTickers = ref([])
const selectedTicker = ref(null)
const isDuplicateTicker = ref(false)
const filterNameTicker = ref('')
const allTickers = ref(null)

const filterList = computed(() => {
    if (createdTickers.value.length == 0) return;
    return createdTickers.value.filter(item => item.name.toLowerCase().includes(filterNameTicker.value.toLowerCase()))

})
watch(createdTickers, () => {
    filterNameTicker.value = ""
    isDuplicateTicker.value = false
}, { deep: true })

onMounted(async () => {
    const res = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3")
    const result = await res.json()
    allTickers.value = Object.keys(result.Data)
})

function removeTicker(t) {
    createdTickers.value = createdTickers.value.filter(item => item.name != t)
}

function selectTicker(item) {
    selectedTicker.value = item
}

function addTicker(t) {
    try {
        if (!t) return;
        if (!allTickers.value.some(item => item.toLowerCase() == t.toLowerCase())) {
            return alert('Нет такого тикера')
        }
        if (createdTickers.value.some(item => item.name.toLowerCase() === t.toLowerCase())) {
            return isDuplicateTicker.value = true
        }

        createdTickers.value.push({ name: t, course: "-" });


    } catch (error) {
        alert(error.message);
    }
}

</script>
<template>
    <div class="page">
        <div class="container">
            <Dashboard @add-ticker="addTicker" 
            :isDuplicateTicker="isDuplicateTicker" :allTickers="allTickers" />
            <div class="pagination">
                <button class="pagination__button">
                    Назад
                </button>
                <button class="pagination__button">
                    Вперед
                </button>
                <div class="filter">
                    Фильтр: <input v-model="filterNameTicker" type="text" class="filter__input" />
                </div>
            </div>
            <dl class="tickers__list">
                <Card v-for="item of filterList" :key="item.id" :name="item.name" :course="item.course" tabindex="0"
                    :class="{ 'border-4': selectedTicker == item }" @select-ticker="selectTicker(item)"
                    @remove-ticker="removeTicker(item)" />
            </dl>
            <Diagram :selectedTicker="selectedTicker" />
        </div>
    </div>
</template>
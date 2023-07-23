<script setup>
import CircleReload from '@/components/icons/CircleReload.vue'
import Card from '@/components/Card.vue';
import Diagram from '@/components/Diagram.vue';
import Pagination from '@/components/Pagination.Vue';
import Dashboard from '@/components/Dashboard.vue';
import { useValidateTicker } from '@/composables/ValidationTicker.js'
import { useFilterTickers } from '@/composables/FilterTickers.js'
import { useGraph } from '@/composables/Graph.js'
import { getTickers, getAllTickers, getTopTickers } from '@/api.js'
import { onMounted, ref, watch } from 'vue';

const createdTickers = ref([])
const allTickers = ref(null)
const selectedTicker = ref(null)

// Composables

const { page, endIndex, setPage, paginationList, filterList, filterNameTicker } = useFilterTickers({ createdTickers })
const { masGraphPrice, maxGraphElements, graphElement, calcMaxGraphElements } = useGraph()
const { isDuplicateTicker, searhDuplicapeTicker } = useValidateTicker({ createdTickers, allTickers })

let selectedCurrency = 'USD'
let topListTickers = []

watch(() => createdTickers.value.length, (newVal, oldVal) => {
    
    if (newVal.length < oldVal.length) {
        selectedTicker.value = null
    }

    filterNameTicker.value = ""
    isDuplicateTicker.value = false
    localStorage.setItem('createdTickers', JSON.stringify(createdTickers.value))
})

watch(() => selectedTicker.value, () => {
    masGraphPrice.value = []
})

onMounted(async () => {
    createdTickers.value = JSON.parse(localStorage.getItem('createdTickers')) ?? []
    topListTickers = await getTopTickers()
    allTickers.value = await getAllTickers()
    if (createdTickers.value.length) {
        updateTickers()
    }

})

function updateTickers() {
    setInterval(async () => {
        let res = await getTickers(createdTickers)
        createdTickers.value.forEach((item) => {
            let { name, currency } = item
            item.course = res[name]?.[currency] ?? 'not coins'
            if (item == selectedTicker.value) {
                masGraphPrice.value.push(item.course);
                if (masGraphPrice.value.length > maxGraphElements.value) {
                    masGraphPrice.value.splice(0, maxGraphElements.value)
                }

            }
        })
    }, 5000)
}

function addTicker(ticker, tickerCurrency) {
    searhDuplicapeTicker(ticker, tickerCurrency)
    createdTickers.value.push({ name: ticker.toUpperCase(), course: "-", currency: selectedCurrency });
    updateTickers()
}
function removeTicker(ticker) {
    createdTickers.value = createdTickers.value.filter(item => item != ticker)
    if (selectedTicker.value == ticker) {
        selectedTicker.value = null
    }
}

function setActiveCurrecy(currency) {
    selectedCurrency = currency
}
function selectTicker(ticker) {
    selectedTicker.value = ticker
    calcMaxGraphElements()
}
function closeDiagram() {
    selectedTicker.value = null
}

</script>
<template>
    <div class="page">
        <div class="container">
            <Dashboard 
                @add-ticker="addTicker" 
                @set-active-currecy="setActiveCurrecy" 
                :topListTickers="topListTickers"
                :isDuplicateTicker="isDuplicateTicker" 
                :allTickers="allTickers" 
            />
            <div class="filter">
                Фильтр:
                <input 
                    v-model="filterNameTicker" 
                    type="text" 
                    class="filter__input" 
                />
            </div>
            <hr class="hr" v-if="createdTickers?.length">
            <dl class="tickers__list">
                <Card 
                    v-for="item of paginationList" 
                    :key="item.id" 
                    :name="item.name" 
                    :currency="item.currency"
                    :course="item.course" 
                    :class="{ 'outline': selectedTicker == item }" 
                    @select-ticker="selectTicker(item)"
                    @remove-ticker="removeTicker(item)" 
                    tabindex="0" 
                />
            </dl>
            <hr class="hr" v-if="filterList?.length">
            <Pagination 
                :filterList="filterList" 
                @set-page="setPage" 
                :endIndex="endIndex" 
                :page="page"
                :filterNameTicker="filterNameTicker" 
            />
            <Diagram 
                :selectedTicker="selectedTicker" 
                :masGraphPrice="masGraphPrice" 
                ref="graphElement"
                @close-diagram="closeDiagram" 
            />
        </div>
    </div>
    <div class="reload" v-if="!allTickers">
        <CircleReload class="reload__circle"></CircleReload>
    </div>
</template>
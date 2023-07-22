<script setup>
import Card from '@/components/Card.vue';
import Diagram from '@/components/Diagram.vue';
import Pagination from '@/components/Pagination.Vue';
import Dashboard from '@/components/Dashboard.vue';
import { useValidateTicker } from '@/composables/useValidationTicker.js'
import { getTickers, getAllTickers, getTopTickers } from '@/api.js'

import { onMounted,onUnmounted, ref, computed, watch} from 'vue';

const createdTickers = ref([])
const allTickers = ref(null)
const graph = ref([])
const page = ref(1)

const maxGraphElements=ref(1)
const graphElement = ref(null)


const filterNameTicker = ref("")
const isDuplicateTicker = ref(false)
const selectedTicker = ref(null)

let selectedCurrency = 'USD'
let topListTickers = []


const startIndex = computed( () => (page.value - 1) * 6)
const endIndex = computed( () => page.value * 6)

const filterList = computed(() => {
    if (createdTickers.value.length == 0) return;
    const res = createdTickers.value?.filter(item => item.name.toLowerCase().includes(filterNameTicker.value.toLowerCase()))
    return res
})


const paginationList = computed( () => {
    return filterList.value?.slice(startIndex.value,endIndex.value)
})

watch(() => paginationList.value, () =>{

    if (paginationList.value?.length == 0 && page.value > 1) {
        page.value -= 1;
        console.log(page.value)
    }

})

watch(() => createdTickers.value.length, (newVal, oldVal) => {

  if(newVal.length < oldVal.length){
    selectedTicker.value = null
  }

  filterNameTicker.value = ""
  isDuplicateTicker.value = false
  localStorage.setItem('createdTickers', JSON.stringify(createdTickers.value))

})


watch( () => selectedTicker.value, () => {
    graph.value = []

})
watch( () => filterNameTicker.value, () => {
    page.value = 1

})

onMounted(async () => {
    topListTickers = await getTopTickers() 
    allTickers.value = await getAllTickers()
    if(createdTickers.value.length){
        updateTickers()
    }

})
onMounted(() => {
    createdTickers.value = JSON.parse(localStorage.getItem('createdTickers')) ?? []
    window.addEventListener("resize", calculateMaxGraphElements);
})

onUnmounted( () =>{
     window.removeEventListener("resize", calculateMaxGraphElements);

 })




function updateTickers(){
    setInterval( async () =>{
        let res = await getTickers(createdTickers)
        createdTickers.value.forEach( (item) => {
            let {name,currency} = item
            item.course = res[name]?.[currency] ?? 'not coins'
            if (item == selectedTicker.value) {
                graph.value.push(item.course);
                while (graph.value.length > maxGraphElements.value) {
                  graph.value.shift()
                }

            }
        })},2000)
}
function calculateMaxGraphElements() {
      if (!graphElement.value) {
        return;
      }
     return maxGraphElements.value = graphElement.value.diagramColums?.clientWidth / 38;
}

function addTicker(t,tc) {

    useValidateTicker({ tc,t, createdTickers, allTickers, isDuplicateTicker })
    createdTickers.value.push({ name: t.toUpperCase(), course: "-", currency: selectedCurrency });
    updateTickers()

}
function removeTicker(t) {
    createdTickers.value = createdTickers.value.filter(item => item != t)
    if(selectedTicker.value == t) {
        selectedTicker.value = null
    }
}

function setActiveCurrecy(c){
    selectedCurrency = c
}
function selectTicker(t) {
    selectedTicker.value = t
    calculateMaxGraphElements()
}
function closeDiagram(){
    selectedTicker.value = null
}
function setPage(flag){
    flag?page.value += 1:page.value -= 1
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
              :createdTickers="createdTickers"  
              @set-page="setPage"
              :endIndex="endIndex"
              :page="page"
              :filterNameTicker="filterNameTicker"
            />
            <Diagram
              :selectedTicker="selectedTicker"
              :graph="graph"
              ref="graphElement"
              @close-diagram="closeDiagram"
            />
        </div>
    </div>
    <div class="reload" v-if="!allTickers">
        <svg class="reload__circle" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
    </div>
</template>
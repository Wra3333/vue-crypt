import { computed, ref, watch } from "vue"

export function useFilterTickers({ createdTickers }) {

  const page = ref(1)
  const filterNameTicker = ref("")
  const startIndex = computed(() => (page.value - 1) * 6)
  const endIndex = computed(() => page.value * 6)


  function setPage(flag) {
    flag ? page.value += 1 : page.value -= 1
  }

  const filterList = computed(() => {
    if (createdTickers.value.length == 0) return;
    const res = createdTickers.value?.filter(item => item.name.toLowerCase().includes(filterNameTicker.value.toLowerCase()))
    return res
  })

  const paginationList = computed(() => {
    return filterList.value?.slice(startIndex.value, endIndex.value)
  })

  watch(() => paginationList.value, () => {

    if (paginationList.value?.length == 0 && page.value > 1) {
      page.value -= 1;
    }

  })
  watch(() => filterNameTicker.value, () => {
    page.value = 1

  })

  return { page, startIndex, endIndex, setPage, paginationList, filterList, filterNameTicker }
}
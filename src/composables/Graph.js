import { computed, ref, watch,onMounted,onUnmounted } from "vue"

export function useGraph() {

  const masGraphPrice = ref([])
  const maxGraphElements = ref(1)
  const graphElement = ref(null)

  onMounted(() => {
    window.addEventListener("resize", calcMaxGraphElements);
  })

  onUnmounted(() => {
    window.removeEventListener("resize", calcMaxGraphElements);

  })

  function calcMaxGraphElements() {
    if (!graphElement.value) {
      return;
    }
    return maxGraphElements.value = graphElement.value.diagramColums?.clientWidth / 14;
  }

  return { masGraphPrice, graphElement, maxGraphElements, calcMaxGraphElements }
}
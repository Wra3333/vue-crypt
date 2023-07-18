import { computed } from "vue"

function useValidateTicker(obj){
  
  const {t, allTickers, createdTickers, isDuplicateTicker,tc} = obj

  let currentTicker = createdTickers.value.some(item => item.name == t && item.currency == tc)

  if (!t){
    throw new Error("Тикер не определен")
  }
  if (!allTickers.value.some(item => item.toLowerCase() == t.toLowerCase())) {
    alert('Нет такого тикера')
    throw new Error('Нет такого тикера')
  }
  if (currentTicker) {
    isDuplicateTicker.value = true
    throw new Error('Дубликат')
  }

}

export {useValidateTicker}
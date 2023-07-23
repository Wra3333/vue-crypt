import { ref } from "vue"

export function useValidateTicker({allTickers, createdTickers}){

  const isDuplicateTicker = ref(false)

  function searhDuplicapeTicker(ticker,tickerCurrency){

    let currentTicker = createdTickers?.value.some(item => item.name == ticker && item.currency == tickerCurrency)
    
    if (!ticker){
      throw new Error("Тикер не определен")
    }
    if (!allTickers?.value.some(item => item.toLowerCase() == ticker.toLowerCase())) {
      alert('Нет такого тикера')
      throw new Error('Нет такого тикера')
    }
    if (currentTicker) {
      isDuplicateTicker.value = true
      throw new Error('Дубликат')
    }
  }
  
  return{isDuplicateTicker,searhDuplicapeTicker}

}
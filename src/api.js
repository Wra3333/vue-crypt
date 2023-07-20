const API_KEY = '2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3312321321312';

async function getTickers(t) {
      let tickers = t.value.reduce((arr, item) => {
        arr.push(item.name);
        return arr;
      }, []);    
      if(!tickers.length) return;
      const j = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers}&tsyms=USD,UAH,TRY,JPY,EUR,RUB&api_key=${API_KEY}`);
      const data = await j.json();
      return data
}

async function getAllTickers() {
  const j = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=${API_KEY}`);
  const result = await j.json();
  return Object.keys(result.Data);
}
async function getTopTickers() {
  const j = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${API_KEY}`);
  const subRes = await j.json();
  const result = subRes.Data.reduce((arr, item) => {
    arr.push(item.CoinInfo.Name);
    return arr;
  }, []);
  return result
}
export { getTickers, getAllTickers,getTopTickers };
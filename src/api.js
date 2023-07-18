const API_KEY = '2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3312321321312';

let interval
async function getTickers(t) {
  const result = await new Promise(resolve => {
    clearInterval(interval);
    interval = setInterval(async () => {
      let tickers = t.value.reduce((arr, item) => {
        arr.push(item.name);
        return arr;
      }, []);    
      if(!tickers.length) return;
      const j = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers}&tsyms=USD,UAH,TRY,JPY,EUR,RUB&api_key=${API_KEY}`);
      const data = await j.json();
      console.log(data)
      if (data) {
        resolve(data);
      }
    }, 2000);
  });

  return result;
}

async function getAllTickers() {
  const j = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=${API_KEY}`);
  const result = await j.json();
  return Object.keys(result.Data);
}
async function getTopTickers() {
  const j = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${API_KEY}`);
  const subRes = await j.json();
  console.log(subRes)
  const result = subRes.Data.reduce((arr, item) => {
    arr.push(item.CoinInfo.Name);
    return arr;
  }, []);
  return result
}
export { getTickers, getAllTickers,getTopTickers };
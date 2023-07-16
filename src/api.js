const API_KEY = '2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3'
async function getTickers(){
      const j = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD&api_key=${API_KEY}`);
      const result = await j.json();
      return result
} 

export {getTickers}
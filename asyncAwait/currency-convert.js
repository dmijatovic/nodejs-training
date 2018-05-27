
const axios = require('axios');

const api={
  currency:{
    baseUrl: "https://free.currencyconverterapi.com/api/v5/",
    currencies: 'currencies',
    countries: 'countries',
    convert:'https://free.currencyconverterapi.com/api/v5/convert'
  },
  country:{
    currency:'https://restcountries.eu/rest/v2/currency/' 
  }
  
}

const getExchangeRate = (from_to) => {
  let url = api.currency.convert + `?q=${from_to}`;
  return axios.get(url)
  .then((resp)=>{
    //debugger 
    if (resp.status==200){
      return resp.data.results;
    }else{
      throw Error(resp.status + "-" + resp.statusText);
    }
  });
};


const getExchangeRateAwait = async (from_to) => {
  let url = api.currency.convert + `?q=${from_to}`;
  //await for promise to resolve
  let resp = await axios.get(url);
  //return  
  return resp.data.results;
};


const getCountries = (currencyCode) =>{
  let url = api.country.currency + currencyCode;
  
  return axios.get(url)
  .then((resp)=>{
    //debugger 
    if (resp.status==200){
      return resp.data;
    }else{
      throw Error(resp.status + "-" + resp.statusText);
    }
  });
};

/*
let from_to="USD_CAD"
getExchangdeRate(from_to).then((data)=>{
  ///debugger 
  console.log(from_to,"...", data[from_to].val);
  //console.log(JSON.stringify(data));
}).catch((e)=>{
  //debugger 
  console.error(e);
});

let currency = "USD";
getCountries(currency).then((d)=>{
  let list =[]
  d.map((item)=>{
    list.push(item.name);
  });
  console.log("currency...", currency, "...countries...",list.length);
})*/


const convertCurrency = (from, to, amount) =>{
  let from_to = from + "_" + to, converted; 

  return getExchangeRate(from_to).then((d)=>{
    debugger
    converted = (amount * d[from_to].val).toFixed(2); 
    return getCountries(to);
  })
  .then((c)=>{
    let list=[];
    c.map((item)=>{
      list.push(item.name);
    });
    return list;
  })
  .then((countries)=>{
    return `${amount} ${from} is worth ${converted} ${to}. You can spend it in ${countries.join(", ")}.`;
  })
  .catch((e)=>{
    console.error(e);
  });
};

// convertCurrency("CAD", "EUR", 100).then((d)=>{
//   console.log(d);
// });


/**
 * ASYNC version of promises function
 * note! async marked function returns a PROMISE!!!
 * you need to call then((d)=>) to resolve
 * @param {*} from 
 * @param {*} to 
 * @param {*} amount 
 */
const convertCurrencyAwait = async (from, to, amount) =>{
  let from_to = from + "_" + to; 
  let d  =  await getExchangeRate(from_to);
  let converted = (amount * d[from_to].val).toFixed(2);
  let c = await getCountries(to);
  let countries=[];
  c.map((item)=>{
    countries.push(item.name);
  });
  return `${amount} ${from} is worth ${converted} ${to}. You can spend it in ${countries.join(", ")}.`;
};

convertCurrencyAwait("USD", "EUR", 100).then((d)=>{
  console.log(d);
}).catch((e)=>{
  console.error(e);
});

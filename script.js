let myChart = document.querySelector('#my-chart');

let API_KEY = 'sXypXBTu3UnfWhDfqZ6HKxVx2ckxgm4drQzfc2BB';

let marsWeatherDataUrl = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'

async function fetchData() {
  let response = await fetch(marsWeatherDataUrl);
  let data = await response.json();
  let marsData = data.soles;
  let {solArray, minTempArray, maxTempArray} = tempData(marsData, 30);

  new Chart(myChart, {
    type: 'line',
    data: {
      labels: solArray,
      datasets: [
        {
          label: 'max temp',
          data: maxTempArray,
          borderWidth: 2
        },
        {
          label: 'min temp',
          data: minTempArray,
          borderWidth: 2
        }
      ]
    }
  });
  
}


fetchData()

function tempData(soles, solesNum) {

  let solArray = [];
  let minTempArray = [];
  let maxTempArray = [];
  
  for(let i = 0; i < solesNum; i++) {
    solArray.push(soles[i].sol)
    minTempArray.push(soles[i].min_temp)
    maxTempArray.push(soles[i].max_temp)
  }
  
  return {
    solArray,
    minTempArray,
    maxTempArray
  }
}
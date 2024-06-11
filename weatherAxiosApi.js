const apiKey = "2ee27edc88eb4e8eff1c5b63702d38ea";
const Apiurl = "https://api.openweathermap.org/data/2.5/forecast?q=";

let cityName = document.getElementById("cityInput");
cityName.addEventListener("change", () => {
  getValue(cityName.value);
});

let searchbutton = document.getElementById("button");

searchbutton.addEventListener("click", () => {
  getValue(cityName.value);
});

let storeCityName = "";

async function getValue(city) {
  try {
    if (city === "") {
      document.querySelector("#error").style.display = "block";
      document.querySelector("#weatherContainer").style.display = "none";
      document.querySelector("#error1").style.display = "none";
      document.querySelector("#error2").style.display = "none";
    }
    // const response = await

    if (storeCityName === city && storeCityName !== '') {
      // console.log(storeCityName,"Already name exist");

      document.querySelector("#error1").style.display = "block";
      // document.querySelector("#weatherContainer").style.display="none";
      
    } 
    
     else{
      storeCityName = "";

      axios.get(Apiurl + city + `&appid=${apiKey}`).then((response) => {

        // if(response.status === 404){

          
        //     // console.log('Resource not found (404)');
      
            
        // }
        
        // console.log(response);
        for (i = 0; i < 5; i++) {
          document.getElementById("day" + (i + 1) + "Min").innerHTML =
            "Min: " +
            Number(response.data.list[i].main.temp_min - 273.15).toFixed(1) +
            "°";
        }
        for (i = 0; i < 5; i++) {
          document.getElementById("day" + (i + 1) + "Max").innerHTML =
            "Max: " +
            Number(response.data.list[i].main.temp_max - 273.15).toFixed(2) +
            "°";
        }

        for (i = 0; i < 5; i++) {
          document.getElementById("img" + (i + 1)).src =
            "http://openweathermap.org/img/wn/" +
            response.data.list[i].weather[0].icon +
            ".png";
        }

        document.querySelector("#weatherContainer").style.display = "block";
        document.querySelector("#error1").style.display = "none";
        document.querySelector("#error").style.display = "none";
        document.querySelector("#error2").style.display = "none";

        storeCityName = city;
      // }
      })
      .catch((error) =>{
        document.querySelector("#error2").style.display = "block";
      }


      )
      }
    
    }
    
  // } 
  
  catch (error) {
    // console.error('Resource not found (404)');

    //   document.getElementById('error-message').innerText = 'Resource not found (404)';
  }
}

const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

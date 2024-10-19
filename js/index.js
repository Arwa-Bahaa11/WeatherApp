getLocation();

       // * to get the location of the user 


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    let x = new XMLHttpRequest();

  x.open("POST",`https://api.weatherapi.com/v1/forecast.json?key=87be0b6693274422bf5104142241510&q=${lat},${longi}&days=3`);
  
  x.send();
  
  x.addEventListener("readystatechange",function(){
      if(x.readyState == 4){
         displayWeather(JSON.parse(x.response))
      }
  })
  }

  
  


  

// * User use the input field

let locationElement = document.querySelector(".location");
locationElement.oninput = function(){let countryName = locationElement.value;
   //* console.log(countryName);

  let x = new XMLHttpRequest();

x.open("POST",`https://api.weatherapi.com/v1/forecast.json?key=87be0b6693274422bf5104142241510&q=${countryName}&days=3`);

x.send();

x.addEventListener("readystatechange",function(){
    if(x.readyState == 4){
       displayWeather(JSON.parse(x.response))
    }
})
    
}



// ! display function

function displayWeather(arr){


    console.log(arr);

    const currentDate = arr.location.localtime;
    //* console.log(currentDate)
    
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   const date = new Date(currentDate);
   const currentDayOfWeek = weekday[date.getDay()];


   const tommorrow = arr.forecast.forecastday[1].date;
   const tommorowDate = new Date(tommorrow);
   const tomorrowDay = weekday[tommorowDate.getDay()];

  
   
   const nexttomorrow = arr.forecast.forecastday[2].date;
   const nexttomorrowDate = new Date(nexttomorrow);
   const nexttomorrowDay = weekday[nexttomorrowDate.getDay()]

    let dayDate = date.getDate();
     console.log(dayDate)

   const month = new Date();
   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   let monthName = months[month.getMonth()];
      
    

     //*console.log(currentDayOfWeek)



    const conatiner = document.querySelector(".today-card");

    

        conatiner.innerHTML = `
        

       
                  
                        <div class="upper-txt d-flex justify-content-between">
                            <p>${currentDayOfWeek}</p>
                            <p>${dayDate}${monthName}</p>
                        </div>

                        <div class="content">
                              

                            <div>${arr.location.name}</div>

                            <div class="today-degree">
                                <h2>${arr.current.temp_c}<sup>o</sup>C</h2>
                                <img src="${arr.current.condition.icon}">
                            </div>

                            <span class="description">${arr.current.condition.text}</span>

                            <div class="list">
                                <ul class="d-flex">
                                    <li class="d-flex"><img src="https://routeweather.netlify.app/images/icon-umberella.png"/><span>${arr.current.humidity}%</span></li>
                                    <li class="d-flex"><img src="https://routeweather.netlify.app/images/icon-wind.png"/><span>${arr.current.wind_kph}Km/h</span></li>
                                    <li class="d-flex"><img src="https://routeweather.netlify.app/images/icon-compass.png"/><span>${arr.current.wind_dir}</span></li>
                                </ul>
                            </div>
                        </div>
                   
        `


        const tomorrowContainer = document.querySelector(".tomorrow-card");

        tomorrowContainer.innerHTML = `
                         <div class="upper-txt">
                            <p class="text-center">${tomorrowDay}</p>
                            
                        </div>

                        <div class="content">
                              

                            

                            <div class="degree">
                                <img src="${arr.forecast.forecastday[1].day.condition.icon}">
                                <h2>${arr.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h2>
                                <p>${arr.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                                
                            </div>

                            <span class="description">${arr.forecast.forecastday[1].day.condition.text}</span>

                           
                        </div>
        `
             

        const nexttomorrowContainer = document.querySelector(".nextday-card");

        nexttomorrowContainer.innerHTML = `
                    
                   <div class="upper-txt">
                            <p class="text-center">${nexttomorrowDay}</p>
                           
                        </div>

                        <div class="content">
                              

                            

                            <div class="degree">
                                <img src="${arr.forecast.forecastday[2].day.condition.icon}">
                                <h2>${arr.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h2>
                                <p>${arr.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                                
                            </div>

                            <span class="description">${arr.forecast.forecastday[2].day.condition.text}</span>

                            
                        </div>
        
        
        `
    }



/* // API KEY // */

const weatherApi = {
    key: "ACA VA TU API_KEY",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
    idioma: "es"
}

const searchInputBox = document.getElementById('input-box');

const valorStorage = JSON.parse(localStorage.getItem('RespuestaLocal'));

if (valorStorage != null){
    showWeatherReport(valorStorage);
}


searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});



/* // Get IM METEOROLOGICO //  */

function getWeatherReport(city) {
    /* fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) */
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&lang=${weatherApi.idioma}&units=metric`)
    .then(function (weather){
        return weather.json();
    }).then(function (weatherJSON){
        showWeatherReport(weatherJSON);
        saveLocalStorage(weatherJSON);
    }).catch(function (error){
        console.log('se trulo!',error);
        
    });
}

function saveLocalStorage (city){
    localStorage.setItem('RespuestaLocal', JSON.stringify(city));
}

/* // IM METEOROLOGICO //  */

function showWeatherReport(weather){
    console.log(weather);

    let icon = weather.weather[0].icon;

    document.querySelector(".icon").src = 
    "http://openweathermap.org/img/wn/" + icon + "@4x.png"; // -> iconoooo 

    document.querySelector('.icon').style.display = "block";
    
    let city = document.getElementById('city');
    city.innerText = `Ciudad: ${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `Temperatura: ${Math.round(weather.main.temp)}&deg;C`;

    let feelsLike = document.getElementById('feelsLike');
    feelsLike.innerHTML = `Sensación Térmica: ${Math.round(weather.main.feels_like)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;
    
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `Clima Actual: ${weather.weather[0].description}`;

    let hum = document.getElementById('hum');
    hum.innerText = `Humedad: ${weather.main.humidity}%`;

    let press = document.getElementById('press');
    press.innerText = `Presion: ${weather.main.pressure} hPa`;

    let wind = document.getElementById('wind');
    wind.innerText = `Viento: ${weather.wind.speed} km/h`;
    

    let date = document.getElementById('date');
    let todayDate = new Date();

    date.innerText = dateManage(todayDate);

}

/* // CONDICIONAL img // */
    
/*     if(weatherType.textContent == 'Clear') {
        document.querySelector(".icon").src = 'http://openweathermap.org/img/wn/01d@2x.png';
        
    } else if(weatherType.textContent == 'Clouds') {

        document.querySelector(".icon").src = 'http://openweathermap.org/img/wn/04d@2x.png';
        
    } else if(weatherType.textContent == 'Haze') {

        document.querySelector(".icon").src = 'http://openweathermap.org/img/wn/50d@2x.png';
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.querySelector(".icon").src ='http://openweathermap.org/img/wn/10d@2x.png';
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.querySelector(".icon").src = 'http://openweathermap.org/img/wn/13d@2x.png';
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.querySelector(".icon").src ='http://openweathermap.org/img/wn/11d@2x.png';
        
    } 
} */

// Date manage
function dateManage(dateArg) {

    let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} de ${month} (${day}), ${year}`;
}

const sb = document.querySelector('#citys');
let day = document.getElementById("days");
let now = new Date();

let format_now = now.toISOString().split('T')[0];

let daysLag = Math.ceil(Math.abs(day.value - now.getDay()) / (1000 * 3600 * 24));

if (document.getElementById("inlineRadio1").checked == true) {
    document.querySelector(".search").classList.remove("hide");
    document.querySelector(".select").classList.add("hide");
    document.querySelector(".carta").classList.remove("hide");

} else {
    document.querySelector(".select").classList.remove("hide");
    document.querySelector(".search").classList.add("hide");
    document.querySelector(".carta").classList.add("hide");
}

function isNow(){
    if (format_now == day.value || day.value == ""){
        return "Today";
    }
    else
    {
        return day.value;
    }
}

let weather = {
    "apiKey": "10289c3c9136c2d5351799d8147e35f0",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&cnt="+daysLag+"&appid="+ this.apiKey
        ).then((response) => response.json()).then((data) => this.dispalyWeather(data));
    },
    dispalyWeather: function (data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp} = data.main;
        const {speed} = data.wind;

        document.querySelector(".city").innerText = isNow() + " Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp/10+ "°C";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";

        document.querySelector(".weather").classList.remove("loading");

        //console.log(day.value, format_now, daysLag);
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    select: function () {
        this.fetchWeather(sb.value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".select button").addEventListener("click", function () {
    weather.select();
});

document.querySelector(".search-bar").addEventListener("keyup", function () {
    if (event.key === "Enter") {
        weather.search();
    }
})


function initMap() {

    const gfg_office = {
        lat: 49.40,
        lng: 26.99
    };

    const map = new google.maps.Map(
        document.getElementById("map"), {

            zoom: 5,
            center: gfg_office,
        });
}
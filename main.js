const sb = document.querySelector('#citys');

if(document.getElementById("inlineRadio1").checked === true){
    document.querySelector(".search").classList.remove("hide");
    document.querySelector(".select").classList.add("hide");
}
else{
    document.querySelector(".select").classList.remove("hide");
    document.querySelector(".search").classList.add("hide");
}

    let weather = {
        "apiKey": "10289c3c9136c2d5351799d8147e35f0",
        fetchWeather: function (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey
            ).then((response) => response.json()).then((data) => this.dispalyWeather(data));
        },
        dispalyWeather: function (data) {
                const {name} = data;
                const {icon, description} = data.weather[0];
                const {temp} = data.main;
                const {speed} = data.wind;

                    document.querySelector(".city").innerText = "Weather in " + name;
                    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                    document.querySelector(".discription").innerText = description;
                    document.querySelector(".temp").innerText = Math.round(temp / 10) + "°C";
                    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";

                    document.querySelector(".weather").classList.remove("loading");

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


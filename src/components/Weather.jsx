import React, { useEffect, useState } from "react";
import Loader from "../utlis/Loader";
const Weather = () => {
  const [data, setData] = useState(null);

  const api =
    "https://api.openweathermap.org/data/2.5/weather?lat=31.7167&lon=76.9167&appid=8fbee55cvarfce43ab3dkushal9a43cdc21b65ad9";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        console.log(json, "json");

        setData(json);
      } catch (err) {
        console.error("Error", err);
      }
    };
    fetchdata();
  }, [api]);

  if (!data) return <Loader />;

  const weather = data.weather[0].description;
  const timestamp = data.dt;
  const date = new Date(timestamp * 1000);

  const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() <= 12 ? "AM" : "PM";

  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);


  const currTemp = (data.main.temp - 273.15).toFixed(2);
  const minTemp = (data.main.temp_min - 273.15).toFixed(2);
  const maxTemp = (data.main.temp_max - 273.15).toFixed(2);

  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const visibility = (data.visibility / 1000).toFixed(1);
  const wind = data.wind.speed;

  return (
    <div>
      <div>Current Temp : {currTemp} °C</div>
      <div>
        Feels like : {currTemp} °C , {weather}{" "}
      </div>
      <div>
        Current Time : {hours}:{minutes} {ampm}
      </div>

      <div>
        <div>min : {minTemp} °C</div>
        <div>max : {maxTemp} °C</div>
      </div>
      <div>
        <div>pressure : {pressure} hPa</div>
        <div> humidity : {humidity} %</div>
        <div>visibility : {visibility} km </div>
        <div>wind : {wind} m/s</div>
      </div>
      <div>
        <div>
          Sunrise : {sunrise.getHours().toString().padStart(2, "0")} : {sunrise.getMinutes().toString().padStart(2, "0")} AM
        </div>
        <div>
          Sunset : {sunset.getHours().toString().padStart(2, "0")} : {sunset.getMinutes().toString().padStart(2, "0")} PM
        </div>
      </div>
    </div>
  );
};

export default Weather;

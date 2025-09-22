import React, { useEffect, useState } from "react";
import Loader from "../utlis/Loader";
import location from "../utlis/location.png";
import sunriseIcon from "../utlis/sunrise.png";
import sunsetIcon from "../utlis/sunset.png";

const Weather = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const api = "http://localhost:5000/api/weather/london";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();

        setData(json);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    };
    fetchdata();
  }, [api]);

  if (!data) return <Loader />;
  if (error) return <p>{error}</p>;
  
  const weather = data.weather[0].description;
  const timestamp = data.dt;
  const date = new Date(timestamp * 1000);
  const currLocation = data.name + " " + data.sys.country;
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() <= 12 ? "AM" : "PM";

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

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
    <div className="flex flex-col gap-5 mt-5 mb-5">
      <div className="flex gap-2 items-center">
        <img src={location} alt="location" />
        <div className="text-4xl font-bold">{currLocation}</div>
      </div>
      <div className="flex items-center">
        <img src={iconUrl} alt="weather Icon" />
        <div className="text-3xl">{currTemp} °C</div>
      </div>
      <div className="text-2xl">
        Today's Weather Feels like : {currTemp} °C , {weather}{" "}
      </div>
      <div className="text-xl">
        Current Time : {hours}:{minutes} {ampm}
      </div>

      <div className="flex gap-5">
        <div>min temp : {minTemp} °C</div>
        <div>max temp : {maxTemp} °C</div>
      </div>
      <div className="flex gap-5">
        <div>pressure : {pressure} hPa</div>
        <div> humidity : {humidity} %</div>
        <div>visibility : {visibility} km </div>
        <div>wind : {wind} m/s</div>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-3">
          <img src={sunriseIcon} alt="sunrise" />
          <div>
            Sunrise : {sunrise.getHours().toString().padStart(2, "0")} :{" "}
            {sunrise.getMinutes().toString().padStart(2, "0")} AM
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={sunsetIcon} alt="sunset " />
          <div>
            Sunset : {sunset.getHours().toString().padStart(2, "0")} :{" "}
            {sunset.getMinutes().toString().padStart(2, "0")} PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

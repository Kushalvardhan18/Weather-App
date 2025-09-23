import React from "react";
import Loader from "../utlis/Loader";
import { useState } from "react";
import { useEffect } from "react";

const Forecast = ({cityName}) => {
const city = cityName || "london"
  const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();

        setData(json);
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      }
    };
    fetchdata();
  }, [api]);

  if (!data) return <Loader />;
  if (error) return <p>{error}</p>;

  const forecast = [];
  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes("12:00:00")) {
      forecast.push({
        description: data.list[i].weather[0].description,
        date: data.list[i].dt,
        maxtemp: data.list[i].main.temp_max - 273.15,
        iconCode: data.list[i].weather[0].icon,
        // timezoneOffset:data.list[i].
      });
    }
  }
  


  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl">Next Five Days Weather Forecast</div>
        <div>
          {forecast.map((item, index) => (
            <div key={index} className="flex gap-5 items-center">
              <img
                src={`https://openweathermap.org/img/wn/${item.iconCode}@2x.png`}
                alt="weather icon"
              />
              <div>{item.maxtemp.toFixed(1)} °C</div>
              <div>{item.description}</div>
              <div>
                {new Date(item.date * 1000).toLocaleDateString("en-GB")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;

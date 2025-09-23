import React, { useEffect, useState } from "react";

import Loader from "../utlis/Loader"
const Time = () => {
  const [location,setLocation] = useState(null)
  const city = "paris"
  const url = `https://api.apiverve.com/v1/worldtime?city=${city}`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-API-Key": `${import.meta.env.VITE_TIME_API_KEY}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json.data.foundCities[0]);
        setLocation(json)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  if (!location) return <Loader />;
    const time = location.data.foundCities[0].time12
    const date = location.data.foundCities[0].date
 

  return <div>{time} {date}</div>;
};

export default Time;

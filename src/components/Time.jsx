import React, { useEffect } from "react";

const Time = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const city = "london"
        const response = await fetch(`https://api.apiverve.com/v1/worldtime?city=${city}`, {
          method: "GET",
          headers: {
            "X-API-Key": `${import.meta.env.VITE_TIME_API_KEY}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return <div>Time</div>;
};

export default Time;

import React, { useState } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  function handleSearch() {
    setCity(search);
  }
  return (
    <div>
      <div>
        <input
          type="search"
          name="search"
          placeholder="Search City"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Weather city={city} />
      <Forecast city = {city}/>
    </div>
  );
};

export default Search;

import React, { useState } from "react";

const Search = () => {
    const[search,setSearch] = useState(null)
    function handleSearch(){
        console.log(search);
        
    }
  return (
    <div>
      <div>
        <input type="search" name="search" placeholder="Search City" onChange={(e)=>setSearch(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;

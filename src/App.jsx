import Forecast from "./components/Forecast";
import Search from "./components/Search";
import Weather from "./components/Weather";
import weather from "./utlis/weather.png"
// import Time from "./components/Time";
function App() {
  return (
    <div className="m-5">
      <div>
        <img src={weather} alt="logo" width={250}/>
        <Search/>
      </div>
    </div>
  );
}

export default App;

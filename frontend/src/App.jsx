import Forecast from "./components/Forecast";
import Weather from "./components/Weather";
import weather from "./utlis/weather.png"
function App() {
  return (
    <div className="m-5">
      <div>
        {/* <h1 className="text-center text-5xl">Weather App</h1> */}
        <img src={weather} alt="logo" width={250}/>
      </div>
      <Weather />
      <Forecast />
    </div>
  );
}

export default App;

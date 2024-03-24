import React, { useEffect, useState } from "react";
import Search from "./components/Assets/search.png";
import cloud from "./components/Assets/cloud.png";
import humidity from "./components/Assets/humidity.png";
import wind from "./components/Assets/wind.png";
import drizzle from "./components/Assets/drizzle.png";
import clear from "./components/Assets/clear.png";
import rain from "./components/Assets/rain.png";
import snow from "./components/Assets/snow.png";
import "./home.css";

const WeatherDetail = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humitity,
  windy,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="weather-icon" />
      </div>
      <div className="temp">{temp}'C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-per">{humitity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-per">{windy} km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  const [icon, setIcon] = useState(snow);
  const [temp, settemp] = useState(0);
  const [lat, setlat] = useState(0);
  const [log, setlog] = useState(0);
  const [city, setcity] = useState("chennai");
  const [country, setcountry] = useState("IN");
  const [humitity, sethumitity] = useState(0);
  const [windy, setwindy] = useState(0);
  const [citynot, setcitynot] = useState(false);
  const [load, setload] = useState(false);
  const [error, seterror] = useState(null);
  const [text, settext] = useState("Chennai");
  const weathericonmap = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const searchfun = async () => {
    setload(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=47360ebbae1faa434a8203c06867712d&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.log("City Not found");
        setcitynot(true);
        setload(false);
        return;
      }
      sethumitity(data.main.humidity);
      setwindy(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      const weathericon = data.weather[0].icon;
      setIcon(weathericonmap[weathericon] || clear);
      setcitynot(false);
    } catch (err) {
      console.log("An error occured : ", err.message);
      seterror("An Error Occured");
    } finally {
      setload(false);
    }
  };
  const handlecity = (e) => {
    settext(e.target.value);
  };
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      searchfun();
    }
  };
  useEffect(function () {
    searchfun();
  },[]);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityinput"
            placeholder="Search City"
            value={text}
            onChange={handlecity}
            onKeyDown={handlekeydown}
          />
          <div className="search-icon">
            <img src={Search} alt="search-icon" onClick={() => searchfun()} />
          </div>
        </div>

        {load && <div className="load-message">Loading..</div>}
        {error && <div className="error-message">{error}</div>}
        {citynot && <div className="citynotfound">city not found</div>}
        {!load && !citynot && (
          <WeatherDetail
            icon={icon}
            lat={lat}
            log={log}
            temp={temp}
            city={city}
            humitity={humitity}
            windy={windy}
            country={country}
          />
        )}
        <p className="copyright">
          Designed By<span> @madhanbabu</span>
        </p>
      </div>
    </>
  );
};

export default Home;

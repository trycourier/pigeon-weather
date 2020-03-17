const axios = require("axios");

const getCurrentWeather = async (zip, tempScale) => {
  const units = tempScale === "F" ? "imperial" : "metric";
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        zip,
        units,
        appid: process.env.OPENWEATHER_API_KEY
      }
    }
  );
  let weather = {
    conditions: data.weather[0],
    temp: {
      scale: tempScale,
      current: data.main.temp,
      feels_like: data.main.feels_like,
      high: data.main.temp_max,
      low: data.main.temp_min
    },
    city: data.name 
  };
  weather.conditions.image = `https://openweathermap.org/img/wn/${weather.conditions.icon}@2x.png`
  return weather;
};

module.exports = getCurrentWeather;
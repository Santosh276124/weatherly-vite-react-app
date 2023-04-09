import { DateTime } from "luxon";

const API_KEY = "22f99d264a23bb5f8988dcd4c3c29973";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//   console.log(url);

  return fetch(url)
    .then((res) => res.json())
 
};

const formatCurrentWeather = (data) => {

    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data;

    const {main: details, icon} = weather[0]

    return {lat, lon, feels_like, temp, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}

}

// const formatForecastWeather = (data) => {
//     let {}
// }

const getFormattedWeatherData  = async(searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(data => formatCurrentWeather(data))

    const {lat, lon} = formatCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat, lon, exclude: 'current, minutely, alerts', units: searchParams.units
    }).then(data => formatForecastWeather(data))

    return formattedCurrentWeather;
}

const formatToLocalTime = (secs, zone, format = "cccc, dd, LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromFormat(secs).setZone(zone).toFormat(format);

// export default getFormattedWeatherData;

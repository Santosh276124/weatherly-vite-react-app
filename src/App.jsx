
import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndlocation from './components/TimeAndlocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './components/WeatherService'

function App() {

  const fetchWeather = async() => {
    const data = await getFormattedWeatherData( {q : 'patna'});
    console.log(data)
  }

  fetchWeather();

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 '>

    <TopButtons/>
    <Inputs/>

    <TimeAndlocation/>
    <TemperatureAndDetails/>

    <Forecast title="hourly forecast"/>
    <Forecast title="Daily forecast"/>

    </div>
  )
}

export default App

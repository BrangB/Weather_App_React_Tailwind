import { useEffect, useState } from "react";
import axios from 'axios';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch
} from 'react-icons/io';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind} from 'react-icons/bs'
import {TbTemperatureCelsius, TbThermometer} from 'react-icons/tb'
import {ImSpinner8} from 'react-icons/im'

const APIkey = "1db8c7ec08f082b3d547517c49b1a916";

function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest")
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    if(inputValue !== ''){
      setLocation(inputValue);
    }

    const input = document.querySelector("input");
    input.value = '';
    e.preventDefault();
  }

  //fetch Data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url)
      .then((res) => {
        setData(res.data)
      })
    
  }, [location])

  if(!data){
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin"/>
        </div>
      </div>
    )
  }

  //set icons according to the weather
  let icon;

  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy />
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy />
      break;
    case 'Clear':
      icon = <IoMdSunny />
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break;
    case 'Snow':
      icon = <IoMdSnow />
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-6 lg:px-0 ">
      {/* form */}
      <form className="h-10 bg-black/30 w-full max-w-[450px] mb-8 backdrop-blur-[20px] rounded-2xl ">
        <div className="h-full relative flex items-center justify-between">
          <input onChange={(e) => handleInput(e)} className="flex-1 bg-transparent outline-none ml-4 flex justify-center placeholder:text-white text-white h-full text-[15px] font-light" type="text" placeholder="Search by city or country"/>
          <button onClick={(e) => handleSubmit(e)}  className="w-16 h-8 bg-[#1ab8ed] hover:bg-[#129bc9]  rounded-xl mr-2 flex items-center justify-center text-xl text-white">
            <IoMdSearch />
          </button>
        </div>
      </form>
      {/* cards */}
      <div className="w-full max-w-[450px] text-white min-h-[480px] backdrop-blur-[24px] bg-black/20 py-12 px-6 rounded-[10px]">
        <div>
          {/* card top */}
          <div className="flex items-center gap-x-5">
            {/* icon */}
            <div className="text-[60px]">{icon}</div>
            <div>
              {/* country name */}
              <div className="text-2xl font-semibold">{data.name}, {data.sys.country}</div>
              <div>
                {date.getUTCDate()}/ {date.getUTCMonth() + 1}/ {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className="my-16">
            <div className="flex items-center justify-center">
              <div className="text-[100px] font-light leading-none">{parseInt(data.main.temp)}</div>
              <div className="text-4xl"><TbTemperatureCelsius /></div>
            </div>
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
          {/* card bottom */}
          <div className="max-w-[380px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsEye /></div>
                <div>
                  Visibility <span className="ml-2">{data.visibility/1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><TbThermometer /></div>
                <div className="flex">
                  Feels like <div className="flex ml-2">{parseInt(data.main.feels_like)} <TbTemperatureCelsius /></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWater /></div>
                <div>
                  Humidity <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWind /></div>
                <div >
                  Wind <span className=" ml-2">{parseInt(data.wind.speed)} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

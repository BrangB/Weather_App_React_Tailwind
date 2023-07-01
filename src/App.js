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
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    if(inputValue !== ''){
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if(input.value == ''){
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false)
      }, 500);
    }

    input.value = '';
    e.preventDefault();
  }

  //fetch Data
  useEffect(() => {

    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data)
          setLoading(false);
        }, 1500);
      }).catch(err => {
        setLoading(false)
        setErrMsg(err)
      })
    
  }, [location])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMsg('')
    }, 2000);

    return () => clearTimeout(timer)
  }, [errMsg])

  if(!data){
    return (
      <div className="w-full h-screen bg-gradientBg bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white"/>
        </div>
      </div>
    )
  }

  //set icons according to the weather
  let icon;

  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy className="text-[#31cafb]"/>
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#31cafb]"/>
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]"/>
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#31cafb]"/>
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#31cafb]"/>
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-6 lg:px-0 ">
      {errMsg && <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-8 py-2 px-4 capitalilze rounded-md">{errMsg.response.data.message}</div>}
      {/* form */}
      <form className={`${animate? "animate-shake" : "animate-none"} h-10 bg-black/30 w-full max-w-[450px] mb-8 backdrop-blur-[20px] rounded-2xl`}>
        <div className="h-full relative flex items-center justify-between">
          <input onChange={(e) => handleInput(e)} className="flex-1 bg-transparent outline-none ml-4 flex justify-center placeholder:text-white text-white h-full text-[15px] font-light" type="text" placeholder="Search by city or country"/>
          <button onClick={(e) => handleSubmit(e)}  className="w-14 h-8 bg-[#1ab8ed] hover:bg-[#129bc9]  rounded-xl mr-2 flex items-center justify-center text-xl text-white">
            <IoMdSearch />
          </button>
        </div>
      </form>
      {/* cards */}
      <div className="w-full max-w-[430px] text-white min-h-[400px] backdrop-blur-[24px] bg-black/20 py-6 px-6 rounded-[10px]">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-4xl animate-spin "/>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
          {/* card top */}
          <div className="flex items-center gap-x-5">
            {/* icon */}
            <div className="text-[50px]">{icon}</div>
            <div>
              {/* country name */}
              <div className="text-2xl font-semibold">{data.name}, {data.sys.country}</div>
              <div>
                {date.getUTCDate()}/ {date.getUTCMonth() + 1}/ {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className="my-8">
            <div className="flex items-center justify-center">
              <div className="text-[70px] font-light leading-none">{parseInt(data.main.temp)}</div>
              <div className="text-3xl"><TbTemperatureCelsius /></div>
            </div>
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
          {/* card bottom */}
          <div className="max-w-[380px] mx-auto flex flex-col gap-y-6 w-full">
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
        )}
      </div>
    </div>
  );
}

export default App;

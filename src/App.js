import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
// import Day from './Day.png';
// import night from './night.png';
import pcloudy from './pcloudy.svg';
import mcloudy from './mcloudy.svg';
import fog from './fog.svg';
// import clear from './clear.svg';
import drizzle from './drizzle.svg';
import snow from './snow.svg';
import rain from './rain.svg';
import storm from './storm.svg';
import { render } from '@testing-library/react';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle } from  'react-loader-spinner'


function WeatherImage({id}) {
  let weatherImage = ""
  switch (true) {
    case id < 300:
      weatherImage = <img className="weatherStyle" src={storm} alt="storm icon" />;
      break;
    case id >= 300 && id < 500:
      weatherImage = <img className="weatherStyle" src={drizzle} alt="drizzle icon" />;
      break;
    case id >= 500 && id < 600:
      weatherImage = <img className="weatherStyle" src={rain} alt="rain icon" />;
      break;
    case id >= 600 && id < 700:
      weatherImage = <img className="weatherStyle" src={snow} alt="snow icon" />;
      break;
    case id >= 700 && id < 800:
      weatherImage = <img className="weatherStyle" src={fog} alt="fog icon" />;
      break;
    // case id === 800:
    //   id = <img className="weatherStyle" src={clear} alt="clear icon" />;
    //   break;
    case id === 801:
      weatherImage = <img className="weatherStyle" src={pcloudy} alt="particularly cloudy icon" />;
      break;
    case id > 800 && id < 806:
      weatherImage = <img className="weatherStyle" src={mcloudy} alt="mostly cloudy icon" />;
      break;
    default:
      weatherImage = 'missing id';
  }
  return weatherImage;
}

 class App extends Component {
constructor(props){
  super(props);
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  
  this.state = {

    error:null,
    temp:null,
    sunrise:null,
    sunset:null,
    name:null,
    description:null,
    humidity:null,
    id:null,
    day: moment().format('dddd'),
    date: moment().format('LL'),
    current:time.toString(),
    isLoading: false,
  };
}

componentDidMount = () => {
  this.setState({isLoading:true});

  const failureCallback = error => {
    this.setState({
      error: error,
    })
    
  }
  const successCallback = (position) => {
  
  
  const appid ="fdb23322e4cc55a4014aaa3ea6e145e7";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&appid=${appid}`

  // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=12.9716&lon=77.5946&appid=fdb23322e4cc55a4014aaa3ea6e145e7`
  fetch(weatherUrl)
  
    .then(results => results.json())
    .then(data => {
      console.log("data",data);
      this.setState({
        temp: (parseInt(data?.main?.temp - 273.15)),
        name: data?.name,
        sunrise:(new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-IN')),
        sunset:(new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-IN')),
        description:data?.weather[0]?.main,
        humidity:data?.main?.humidity,
        id:data?.weather[0]?.id,
       isLoading: false,
      })
    });
 
  }
  if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
    // getCurrentPosition(successCallback, failureCallback);
   } 
  
}
//function call

 Spinner = () =>{
  return(
    <div className='spinner'>
    <BallTriangle
        height="100"
        width="100"
        color="blue"
        ariaLabel='loading'
      />
  </div>

  )
}

Weather = () => {
  return(

    <div className='weather'>
  
        <header>
        <h1>Weather Web Application</h1>
        
        <h2>{this.state.name}</h2>
        <h3>{this.state.day}{" "}{this.state.date}</h3>
       
        
  
        <h2>{this.state.temp}&deg;C</h2>
        <h3>{this.state.description}</h3>
        </header>
  
        <WeatherImage id={this.state.id}/>
  
  
      <div className='bottom'>
  
  <div className='sunrise'>
    <p><strong>Sunrise</strong></p>
  <p><strong>{this.state.sunrise}</strong></p> 
  </div>
 
  <div className='sunset'>
    <p><strong>Sunset</strong></p>
  <p><strong>{this.state.sunset}</strong></p> 
  </div>
 
  <div className='humidity'>
    <p><strong>Humidity</strong></p>
  <p><strong>{this.state.humidity}%</strong></p> 
  </div>
  
  <div className='timezone'>
    <p><strong>Time</strong></p>
  <p><strong>{this.state.current}</strong></p> 
  </div>
  
      </div>
  
      
  
       </div>
  

  )
}

  render(){

    return <>
    {
    this.state.isLoading ? 
  

    this.Spinner()
    :
    this.Weather()
   
    }
  </>
  
    }
  }
  
  

export default App;

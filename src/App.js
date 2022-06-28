import React, {Component} from 'react';
import './App.css';
// import moment from 'moment';
// // import Day from './Day.png';
// // import night from './night.png';
// import pcloudy from './pcloudy.svg';
// import mcloudy from './mcloudy.svg';
// import fog from './fog.svg';
// // import clear from './clear.svg';
// import drizzle from './drizzle.svg';
// import snow from './snow.svg';
// import rain from './rain.svg';
// import storm from './storm.svg';
// import { render } from '@testing-library/react';

// class WeatherImage extends Component{
//   constructor(id){
//     super(id);
    
    

//   }
// render()
// {
//   return(
//     <div>
//       return weatherImage;
//     </div>
//   )

// }
// }

 class App extends Component {
constructor(props){
  super(props);
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  var current = time.toString();
    
    // const appid ="fdb23322e4cc55a4014aaa3ea6e145e7";

  this.state = {

    // latitude:null,
    // longitude:null,
    error:null,
    temp:null,
    sunrise:null,
    sunset:null,
    name:null,
    description:null,
    humidity:null,
    id:null,
    // coords: [],
    // error : [],


  };
}

componentDidMount = () => {

  const latitude= " ";
  const longitude= " ";
  

  const failureCallback = error => {
    this.setState({
      error: error,
    })
    // console.log('position', error);
    // this.error("Error");
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
        // description:data?.weather[0]?.main,
        humidity:data?.main?.humidity,
        // id:data?.weather[0]?.id,
      })
    });
    
    // console.log("position", position);
    // console.log("latitude is ", position?.coords?.latitude);
    // console.log("longitude is ", position?.coords?.longitude);
    // this.latitude(position?.coords?.latitude);
    // this.longitude(position?.coords?.longitude);
  }
  if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
    // getCurrentPosition(successCallback, failureCallback);
   } 

  
  
}

  render(){
    return (
      <div className='weather'>
      
        <header>
        <h1>Weather Web Application</h1>
        
        <h2>{this.state.name}</h2>
        {/* <h3> {this.state.moment().format('dddd')}{ " "}{moment().format('LL')} </h3> */}
        
  
        <h2>{this.state.temp}&deg;C</h2>
        <h3>{this.state.description}</h3>
   
        </header>
  
        {/* <WeatherImage id={this.state.id}/> */}
  
      {/* done */}
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
  
      
    );
  }

}

export default App;

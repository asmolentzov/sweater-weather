export default class CurrentWeather {
  constructor(attributes) {
    this.temp = attributes.current_weather.temperature;
    this.summary = attributes.current_weather.summary_short;
    this.tempHigh = attributes.current_weather.temp_high;
    this.tempLow = attributes.current_weather.temp_low;
    this.city = attributes.city;
    this.state = attributes.state;
    this.date = attributes.date;
    this.icon = this.setIcon();
  };
  
  setIcon() {
    let weather = this.summary.toLowerCase();
    if(weather.includes('sun')) {
      return this.icon = '<i class="fas fa-sun"></i>'
    } else if(weather.includes('cloud') && weather.includes('partly')) {
      return this.icon = '<i class="fas fa-cloud-sun"></i>'
    } else if(weather.includes('snow')) {
      return this.icon = '<i class="far fa-snowflake"></i>'
    } else if(weather.includes('rain')) {
      return this.icon = '<i class="fas fa-cloud-rain"></i>'
    } else if(weather.includes('cloud')) {
      return this.icon = '<i class="fas fa-cloud"></i>'
    } else {
      return this.icon = '<i class="fas fa-cloud-sun-rain"></i>'
    };
  };
};

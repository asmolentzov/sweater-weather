export default class CurrentWeather {
  constructor(attributes) {
    this.temp = Math.round(attributes.current_weather.temperature);
    this.summaryShort = attributes.current_weather.summary_short;
    this.summary = attributes.current_weather.summary;
    this.tempHigh = Math.round(attributes.current_weather.temp_high);
    this.tempLow = Math.round(attributes.current_weather.temp_low);
    this.tempFeelsLike = Math.round(attributes.current_weather.temp_feels_like);
    this.humidity = Math.round(attributes.current_weather.humidity * 100);
    this.visibility = attributes.current_weather.visibility;
    this.uv = attributes.current_weather.uv_index;
    this.city = attributes.city;
    this.state = attributes.state;
    this.date = attributes.date;
    this.icon = this.setIcon();
  };
  
  setIcon() {
    let weather = this.summaryShort.toLowerCase();
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

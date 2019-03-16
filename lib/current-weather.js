export default class CurrentWeather {
  constructor(attributes) {
    localStorage.setItem("location", attributes.id)
    let weather = attributes.attributes
    this.temp = Math.round(weather.current_weather.temperature);
    this.summaryShort = weather.current_weather.summary_short;
    this.summary = weather.current_weather.summary;
    this.tempHigh = Math.round(weather.current_weather.temp_high);
    this.tempLow = Math.round(weather.current_weather.temp_low);
    this.tempFeelsLike = Math.round(weather.current_weather.temp_feels_like);
    this.humidity = Math.round(weather.current_weather.humidity * 100);
    this.visibility = weather.current_weather.visibility;
    this.uv = weather.current_weather.uv_index;
    this.city = weather.city;
    this.state = weather.state;
    this.date = weather.date;
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

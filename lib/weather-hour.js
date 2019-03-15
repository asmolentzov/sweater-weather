export default class WeatherHour {
  constructor(attributes) {
    this.temp = Math.round(attributes.temperature);
    this.time = attributes.time;
    this.icon = this.setIcon;
  }
  
  setIcon() {
    let weather = this.icon;
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
}
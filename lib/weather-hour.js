export default class WeatherHour {
  constructor(attributes) {
    this.temp = Math.round(attributes.temperature);
    this.date = new Date(attributes.time * 1000);
    debugger;
    this.time = this.setTime();
    this.summaryShort = attributes.icon;
    this.icon = this.setIcon();
  };
  
  setTime() {
    let date = this.date
    let time = date.toTimeString().slice(0, 2)
    if(time > 12) {
      return `${time - 12}PM`
    } else {
      return `${time}AM`
    };
  }
  
  setIcon() {
    let weather = this.summaryShort;
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
export default class WeatherDay {
  constructor(attributes) {
    this.date = attributes.date
    this.day = this.setDay();
    this.summary = attributes.summary;
    this.summaryShort = attributes.icon;
    this.icon = this.setIcon();
    this.precipProbability = Math.round(attributes.precip_probability * 100);
    this.tempHigh = Math.round(attributes.temp_high);
    this.tempLow = Math.round(attributes.temp_low);
  };
  
  setDay() {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let splitDate = this.date.split('-').map(data => parseInt(data));
    let date = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    let dayIndex = date.getDay();
    return weekDays[dayIndex];
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
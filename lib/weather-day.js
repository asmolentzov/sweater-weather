export default class WeatherDay {
  constructor(attributes) {
    this.day = attributes.date;
    this.summary = attributes.summary;
    this.summaryShort = attributes.icon;
    this.icon = this.setIcon();
    this.precipProbability = attributes.precip_probability;
    this.tempHigh = attributes.temp_high;
    this.tempLow = attributes.temp_low;
  };
  
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
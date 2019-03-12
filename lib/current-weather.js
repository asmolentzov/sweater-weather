export default class CurrentWeather {
  constructor(attributes) {
    this.temp = attributes.current_weather.temperature;
    this.summary = attributes.current_weather.summary_short;
    this.tempHigh = attributes.current_weather.temp_high;
    this.tempLow = attributes.current_weather.temp_low;
    this.city = attributes.city;
    this.state = attributes.state;
    this.date = attributes.date;
  };
}
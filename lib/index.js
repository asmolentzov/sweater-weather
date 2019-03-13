// This file is in the entry point in your webpack config.
import './styles.scss';
import CurrentWeather from './current-weather'

$('form').on('submit', function(event) {
  event.preventDefault();
  const location = $('input').val().toLowerCase();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/v1/forecast?location=" + location
  })
  .then(setCurrentWeather)
  .catch(function(error) {
    console.log('Error: ' + error);
  });
});

const setCurrentWeather = (weatherInfo) => {
  const currentWeather = new CurrentWeather(weatherInfo.data.attributes);
  $('#current-temp').text(currentWeather.temp + "\xB0F");
  $('#current-summary').text(currentWeather.summary);
  $('#current-temp-high').text(currentWeather.tempHigh + "\xB0F");
  $('#current-temp-low').text(currentWeather.tempLow + "\xB0F");
  $('#current-city').text(currentWeather.city);
  $('#current-state').text(currentWeather.state);
  $('#current-date').text(currentWeather.date);
}
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
  .then(function(data) {
    const currentWeather = new CurrentWeather(data.data.attributes);
    $('#current-temp').text('Temperature: ' + currentWeather.temp);
    $('#current-summary').text('Summary: ' + currentWeather.summary);
    $('#current-temp-high').text('High: ' + currentWeather.tempHigh);
    $('#current-temp-low').text('Low: ' + currentWeather.tempLow);
    $('#current-city').text(currentWeather.city);
    $('#current-state').text(currentWeather.state);
    $('#current-date').text(currentWeather.date);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
});
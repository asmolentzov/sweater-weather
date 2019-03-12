// This file is in the entry point in your webpack config.
import './styles.scss';

$('form').on('submit', function(event) {
  event.preventDefault();
  const location = $('input').val().toLowerCase();
  let temperature;
  let summary;
  let tempHigh;
  let tempLow;
  let city;
  let state;
  let date;
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/v1/forecast?location=" + location
  })
  .then(function(data) {
    data = data.data.attributes
    let weather = data.current_weather
    temperature = weather.temperature;
    $('#current-temp').text('Temperature: ' + temperature);
    summary = weather.summary_short;
    $('#current-summary').text('Summary: ' + summary);
    tempHigh = weather.temp_high;
    $('#current-temp-high').text('High: ' + tempHigh);
    tempLow = weather.temp_low;
    $('#current-temp-low').text('Low: ' + tempLow);
    city = data.city;
    $('#current-city').text(city);
    state = data.state;
    $('#current-state').text(state);
    date = data.date;
    $('#current-date').text(date);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
});
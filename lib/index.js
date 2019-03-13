// This file is in the entry point in your webpack config.
import './styles.scss';
import CurrentWeather from './current-weather'
import BackgroundImage from './background-image'

$('form').on('submit', function(event) {
  event.preventDefault();
  const location = $('input').val().toLowerCase();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/v1/forecast?location=" + location
  })
  .then(setCurrentWeather)
  .catch(errorLog);
  
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/v1/backgrounds?location=" + location
  })
  .then(setBackgroundImage)
  .catch(errorBackground);
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
  $('#current-icon').text('').append(currentWeather.icon);
};

const setBackgroundImage = (imageInfo) => {
  const image = new BackgroundImage(imageInfo.data.attributes);
  $('body').css('background-image', 'url(' + image.url + ')');
};

const errorLog = (error) => {
  console.log(error);
};

const errorBackground = (error) => {
  $('body').css('background-image', 'linear-gradient(-90deg, #006E90, #67B4DA)');
  console.log(error);
};
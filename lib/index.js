// This file is in the entry point in your webpack config.
import './styles.scss';
import CurrentWeather from './current-weather'
import BackgroundImage from './background-image'
import WeatherHour from './weather-hour'

$(document).ready(function() {
  $('#location-form').on('submit', getLocationInfo);
  $('#sign-up').on('submit', registerUser);
})

const registerUser = (event) => {
  event.preventDefault();
  $('.errors').text('');
  const email = $('input')[0].value;
  const password = $('input')[1].value;
  const confPassword = $('input')[2].value;
  if(password !== confPassword) {
    displayError("Error: Please check passwords")
  } else {
    createUser(email, password, confPassword);
  };
};

const createUser = (email, password, confPassword) => {
  const usersUrl = API_URL + "/users"
  $.post(usersUrl, { email, password, password_confirmation: confPassword })
    .done(function(data) {
      document.cookie = `api_key=${data.api_key}`
      window.location.replace('index.html')
      $('.alerts').text('Successfully created account!')
    });
};

const getLocationInfo = (event) => {
  event.preventDefault();
  const location = $('input').val().toLowerCase();
  const locationUrl = API_URL + "/forecast?location=" + location;
  const backgroundUrl = API_URL + "/backgrounds?location=" + location;
  $.get(locationUrl)
    .then(setCurrentWeather)
    .catch(errorLog);
  $.get(backgroundUrl)
    .then(setBackgroundImage)
    .catch(errorBackground);
};

const setCurrentWeather = (weatherInfo) => {
  const currentWeather = new CurrentWeather(weatherInfo.data.attributes);
  postWeatherHours(weatherInfo.data.attributes.weather_hours);
  $('#current-temp').text(currentWeather.temp + "\xB0F");
  $('#current-summary').text(currentWeather.summaryShort);
  $('#current-temp-high').text(currentWeather.tempHigh + "\xB0F");
  $('#current-temp-low').text(currentWeather.tempLow + "\xB0F");
  $('#current-city').text(currentWeather.city);
  $('#current-state').text(currentWeather.state);
  $('#current-date').text(currentWeather.date);
  $('#current-icon').text('').append(currentWeather.icon);
  $('#details-icon').text('').append(currentWeather.icon);
  $('#details-summary-short').text(currentWeather.summaryShort);
  $('#details-summary').text(currentWeather.summary);
  $('#details-feels').text(currentWeather.tempFeelsLike + "\xB0F");
  $('#details-humidity').text(currentWeather.humidity + "%");
  $('#details-visibility').text(currentWeather.visibility + " miles");
  $('#details-uv').text(currentWeather.uv + " out of 10");
};

const setBackgroundImage = (imageInfo) => {
  const image = new BackgroundImage(imageInfo.data.attributes);
  $('.background').removeClass('gradient').html(`<img src=${image.url} //>`)
};

const postWeatherHours = (weatherHours) => {
  const hours = weatherHours.map(weatherHour => {
    return new WeatherHour(weatherHour)
  });
  $('.hourly-time').each(function(index, hour) {
    hour.innerText = hours[index].time
  })
};

const errorLog = (error) => {
  console.log(error);
};

const errorBackground = (error) => {
  $('.background').html('').addClass('gradient');
  console.log(error);
};

const displayError = (error) => {
  $('.errors').text(error);
}
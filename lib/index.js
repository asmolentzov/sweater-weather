// This file is in the entry point in your webpack config.
import './styles.scss';
import CurrentWeather from './current-weather'
import BackgroundImage from './background-image'
import WeatherHour from './weather-hour'
import WeatherDay from './weather-day'

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
    .then(postWeather)
    .catch(errorLog);
  $.get(backgroundUrl)
    .then(setBackgroundImage)
    .catch(errorBackground);
};

const postWeather = (weatherInfo) => {
  postCurrentWeather(weatherInfo.data.attributes);
  postWeatherHours(weatherInfo.data.attributes.weather_hours);
  postWeatherDays(weatherInfo.data.attributes.weather_days);
};

const postCurrentWeather = (weatherInfo) => {
  const currentWeather = new CurrentWeather(weatherInfo);
  $('#current-temp').text(currentWeather.temp + "\xB0F");
  $('#current-summary').text(currentWeather.summaryShort);
  $('#current-temp-high').text(currentWeather.tempHigh + "\xB0F");
  $('#current-temp-low').text(currentWeather.tempLow + "\xB0F");
  $('#current-city').text(currentWeather.city);
  $('#current-state').text(currentWeather.state);
  $('#current-date').text(currentWeather.date);
  $('#current-icon').html(currentWeather.icon);
  $('#details-icon').html(currentWeather.icon); 
  $('#details-summary-short').text(currentWeather.summaryShort);
  $('#details-summary').text(currentWeather.summary);
  $('#details-feels').text(currentWeather.tempFeelsLike + "\xB0F");
  $('#details-humidity').text(currentWeather.humidity + "%");
  $('#details-visibility').text(currentWeather.visibility + " miles");
  $('#details-uv').text(currentWeather.uv + " out of 10");
}

const setBackgroundImage = (imageInfo) => {
  const image = new BackgroundImage(imageInfo.data.attributes);
  $('body').css("background-image", `url("${image.url}")`);
};

const postWeatherHours = (weatherHours) => {
  const hours = weatherHours.map(weatherHour => {
    return new WeatherHour(weatherHour)
  });
  $('.hourly-container').html('')
  hours.forEach(hour => {
    $('.hourly-container').append(`
      <div class="hour">
      <div class="hourly-time">${hour.time}</div>
      <div class="hourly-icon">${hour.icon}</div>
      <div class="hourly-temp">${hour.temp}</div>
      </div>`)
  })
};

const postWeatherDays = (weatherDays) => {
  const days = weatherDays.map(weatherDay => {
    return new WeatherDay(weatherDay)
  });
  $('.daily-table').html('');
  days.forEach(day => {
    $('.daily-table').append(`
      <tr class="day">
        <td class="daily-day">${day.day}</td>
        <td class="daily-summary">${day.icon}<br />${day.summary}</td>
        <td class="daily-precip"><i class="fas fa-tint"></i><br />${day.precipProbability}%</td>
        <td class="daily-high"><i class="fas fa-long-arrow-alt-up"></i>${day.tempHigh}\xB0F</td>
        <td class="daily-low"><i class="fas fa-long-arrow-alt-down"></i>${day.tempLow}\xB0F</td>
      </tr>`)
  })
};

const errorLog = (error) => {
  console.log(error);
};

const errorBackground = (error) => {
  $('body').css("background-image", "linear-gradient(-90deg, #006E90, #67B4DA)")
  console.log(error);
};

const displayError = (error) => {
  $('.errors').text(error);
}
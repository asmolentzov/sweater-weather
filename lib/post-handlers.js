import CurrentWeather from './current-weather'
import BackgroundImage from './background-image'
import WeatherHour from './weather-hour'
import WeatherDay from './weather-day'
import * as errors from './errors';

export const postBackgroundImage = (imageInfo) => {
  const image = new BackgroundImage(imageInfo.data.attributes);
  $('body').css("background-image", `url("${image.url}")`);
};

export const postWeather = (weatherInfo) => {
  $('.alerts').text('');
  errors.clearErrors();
  $('#favorite').prop("disabled", false).text("Favorite");
  postCurrentWeather(weatherInfo.data);
  postWeatherHours(weatherInfo.data.attributes.weather_hours);
  postWeatherDays(weatherInfo.data.attributes.weather_days);
};

export const postCurrentWeather = (weatherInfo) => {
  const currentWeather = new CurrentWeather(weatherInfo);
  localStorage.setItem("currentWeather", JSON.stringify(currentWeather));
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

export const postWeatherHours = (weatherHours) => {
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

export const postWeatherDays = (weatherDays) => {
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

export const postFavorite = (favorite) => {
  if(!favorite) {
    favorite = JSON.parse(localStorage.getItem("currentWeather"));
  }
  $('.favorites').append(`
    <div class="favorite-location">
      <div class="location-info">          
        <div class="city-state"><span class="favorite-city">${favorite.city}</span>, <span class="favorite-state">${favorite.state}</span></div>
      </div>
      <div class="favorite-weather-details">
        <div class="favorite-temp">${favorite.temp}\xB0F</div>
        <div class="favorite-details">
          <div class="favorite-icon">${favorite.icon}</div>
          <div class="favorite-summary">${favorite.summary}</div>
        </div>
      </div>
      <div class="favorite-high-low">
        High: <span class="favorite-temp-high">${favorite.tempHigh}\xB0F</span>   
        Low: <span class="favorite-temp-low">${favorite.tempLow}\xB0F</span>
      </div>
    </div>`)
};
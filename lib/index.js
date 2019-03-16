// This file is in the entry point in your webpack config.
import './styles.scss';
import * as errors from './errors';
import * as post from './post-handlers';


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
    errors.displayError("Error: Please check passwords")
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
    .then(post.postWeather)
    .catch(errors.errorLog);
  $.get(backgroundUrl)
    .then(post.postBackgroundImage)
    .catch(errors.errorBackground);
};

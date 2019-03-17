// This file is in the entry point in your webpack config.
import './styles.scss';
import * as errors from './errors';
import * as post from './post-handlers';

$(document).ready(function() {
  renderNavBar();
  renderFavorites();
  $('#location-form').on('submit', getLocationInfo);
  $('#sign-up').on('submit', registerUser);
  $('#login').on('submit', logIn);
  $('#logout').click(logOut);
  $('#favorite').click(favoriteLocation);
  $(document).on('click', '.remove-favorite', removeFavorite);
})

const registerUser = (event) => {
  event.preventDefault();
  errors.clearErrors();
  const email = $('input')[0].value;
  const password = $('input')[1].value;
  const confPassword = $('input')[2].value;
  if(password !== confPassword) {
    errors.displayError("Error: Please check passwords")
  } else {
    createUser(email, password, confPassword);
  };
};

const logIn = (event) => {
  event.preventDefault();
  errors.clearErrors();
  const email = $('#email').val();
  const password = $('#password').val();
  const loginUrl = API_URL + "/sessions"
  $.post(loginUrl, { email, password })
    .done(function(data) {
      document.cookie = `api_key=${data.api_key}`;
      window.location.replace('index.html')
      $('.alerts').text('Successfully logged in!');
    })
    .fail(function(data) {
      errors.displayError("Please check your email and password, or sign up for a new account!")
    })
};

const logOut = () => {
  document.cookie = "api_key" + "=; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  $('.favorites-container').html('');
  renderNavBar();
}

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

const favoriteLocation = (event) => {
  const location = localStorage.getItem("location")
  const api_key = document.cookie.split('=')[1]
  const favoritesUrl = API_URL + "/favorites"
  $.post(favoritesUrl, { api_key, location })
    .done(addFavorite)
    .fail(function(data) {
      errors.displayError("Please Log In or Sign Up to Favorite locations!")
    })
}

const addFavorite = (data) => {
  $('.alerts').text("Location Favorited!")
  $('#favorite').prop("disabled", true).text("Favorited!")
  post.postFavorite();
}

const removeFavorite = (event) => {
  const locationId = $(event.target.parentElement).find('.location-id').text()
  const apiKey = document.cookie.split('=')[1]
  const favoritesUrl = API_URL + "/favorites"
  $.ajax({
    url: favoritesUrl, 
    method: "delete", 
    data: { 
      api_key: apiKey, 
      location: locationId
    },
    success: function(data) {
      $(`.location-id:contains(${data.data.id})`).parent().parent().remove()
    }
  })
}

const renderNavBar = () => {
  if(currentUser()) {
    $('nav').html(`
      <div id="page-title">
        <a href="index.html">Sweater Weather</a>
      </div>
      <div id="sign-up-link">
        <a href=# id="logout">Log Out</a>
      </div>`)
  } else {
    $('nav').html(`
      <div id="page-title">
        <a href="index.html">Sweater Weather</a>
      </div>
      <div id="sign-up-link">
        <a href="sign-up.html">Sign Up</a>
        | 
        <a href="login.html">Log In</a>
      </div>`)
  };
}

const renderFavorites = () => {
  if(currentUser()) {
    $('.container').append(`<div class="favorites-container">
          <h2>Favorites</h2>
          <div class="favorites">  
          </div>
        </div>`);
    post.postFavorites();
  };
}

const currentUser = () => {
  return document.cookie.split('=')[0] === "api_key";
}
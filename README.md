# Sweater Weather
Sweater Weather is a solo project for Module 4 of the [Back-End Engineering Program](https://turing.io/programs/back-end-engineering/) at the [Turing School of Software & Design](https://turing.io/). The project specifications can be found [here](http://backend.turing.io/module4/projects/self_directed_fe/self_directed_fe_spec). Sweater Weather is the Front-End to a [Back-End project](https://github.com/asmolentzov/sweater_weather) from Module 3 that created an API. This project consumes that API to display weather for a user-specified location. Users can also create accounts, log in, and "favorite" locations. 
# Screenshot HERE!

## Features
Sweater Weather visitors can search for locations and see the current weather as well as the upcoming hourly and daily forecast:
# Screenshot HERE
They can also create an account:
#Screenshot HERE
Or log in: 
# Screenshot HERE
Once they are logged in, they can "favorite" locations, as well as remove favorite locations:
#Screenshot HERE

## Initial Setup
To install this project on your local machine:
1. Clone the repo to your machine: 
```
git clone git@github.com:asmolentzov/sweater-weather.git
```
2. Change into the new directory.
3. Install dependencies: 
```
npm install
```

## Running the Server Locally
To run the code locally, use the following command to start the development server: 
```
npm start
```
Once running, point your browser to: 
```
http://localhost:8080/
```
In its current configuration, the application will hit the deployed API back-end. If you wish to run the full application locally, you will also need to install the back-end locally. Please visit the [Sweater Weather Back-End repo](https://github.com/asmolentzov/sweater_weather) and follow the instructions there to clone and install that repo locally. 
In this repo, you will need to open the `webpack.config.js` file and change the `API_URL` to point to the development URL:
```
new webpack.DefinePlugin({
  'API_URL': localUrl
})
```

## How to Contribute
If you wish to contribute to this repo, you are welcome to make a PR and I would be happy to review it. 

## Built With
* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)

## Author
**[Anna Smolentzov](https://github.com/asmolentzov)**
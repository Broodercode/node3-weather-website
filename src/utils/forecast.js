const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'https://api.darksky.net/forecast/ea87953e23341f78b5993a2acbec31b2/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

request({ url, json: true }, (error, response) => {
    //request({ url, json: true }, (error, {body})  --- This also works via destructuring
    console.log(response.body)
    const {daily, currently, error: errorMsg} = response.body
    const weatherReport = 
        daily.data[0].summary +
          " It is currently " +
          currently.temperature + 
          " degrees and feels like " +
          currently.apparentTemperature +
          " degrees celcius in current weather conditions. There is currently a " +
          currently.precipProbability +
          "% chance of rain."
    
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (errorMsg) {
      callback(errorMsg + ". Unable to find location", undefined);
    } else {
      callback(undefined, weatherReport

      );
    }
  });

}

module.exports = forecast;
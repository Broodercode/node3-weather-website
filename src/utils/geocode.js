const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJvb2RlciIsImEiOiJjazQ0cjZuMWYwMW9mM25vOXRvaXA0a3VlIn0.-sDnE_DdnBlrJBNAkuGYeA&limit=1';

    request({ url, json: true}, (error, response)=> {
        //request({ url, json: true }, (error, {body})  --- This also works via destructuring
        const {features, query} = response.body

        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unabled to find location ' + query[0] + ', try another search', undefined)
        } else {
            const coordinates = {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            }
            callback(undefined, coordinates)
        }
    })
}

module.exports = geocode
import axios from 'axios';

export const getPlacesData = async(type, sw, ne) => {
    try{
      console.log('api/index.js > getPlacesData() for ', sw, ne);
        // request
       const {data:{data}} = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        // method: 'GET',
        url: URL,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
       return data;
        // return [];
    } catch(error){
      return [];
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const query = lat + ', ' + lng;
    console.log({query});
    const {data } = await axios.get('https://weatherapi-com.p.rapidapi.com/search.json', {
      //params: {q: '28.7041, 77.1025'},
      params: {q: query},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });
    return data;
  } catch(error) {
    console.log(error);
  }
}
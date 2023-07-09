import axios from "axios";

const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

let options = {
  params: {
    info: 'base_info',
    list: 'most_pop_movies'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url, listVal) => {
    let response;

    if (listVal) {
      options.params.list = listVal;
    }

    try {
        response = await axios.get(`${BASE_URL}/${url}`, options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    
    return response.data;
}
// Function to get favorited recipes for a logged-in user from the database

import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_SERVER;
const getUserFavorites = () => {
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(`${apiBaseURL}/favorites` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserFavorites;
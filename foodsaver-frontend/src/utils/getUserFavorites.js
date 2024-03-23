// Function to get favorited recipes for a logged-in user from the database

import axios from 'axios';

const getUserFavorites = () => {
  const favoritesURL = 'http://localhost:8090/favorites';
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(favoritesURL , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserFavorites;
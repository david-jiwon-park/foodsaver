import axios from 'axios';

const getUserFavorites = ({ setUserFavorites }) => {
  const favoritesURL = 'http://localhost:8090/favorites';
  const token = sessionStorage.getItem('authToken');
  axios
    .get(favoritesURL , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserFavorites(response.data);
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getUserFavorites;
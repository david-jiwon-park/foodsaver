// Function to get user info for a logged-in user from the database

import axios from 'axios';

const getUserInfo = () => {
  const usersURL = 'http://localhost:8090/users';
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(usersURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserInfo;
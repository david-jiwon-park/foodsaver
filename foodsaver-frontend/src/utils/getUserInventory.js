// Function to get the inventory for a logged-in user from the database

import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_SERVER;
const getUserInventory = () => {
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(`${apiBaseURL}/inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserInventory;

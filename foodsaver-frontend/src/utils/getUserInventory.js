import axios from 'axios';

const getUserInventory = () => {
  const inventoryURL = 'http://localhost:8090/inventory';
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(inventoryURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserInventory;

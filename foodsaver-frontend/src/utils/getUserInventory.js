import axios from 'axios';

const getUserInventory = ({ setUserInventory }) => {
  const inventoryURL = 'http://localhost:8090/inventory';
  const token = sessionStorage.getItem('authToken');
  axios
    .get(inventoryURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserInventory(response.data);
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getUserInventory;

// Delete Food Modal Component

import './DeleteFoodModal.scss';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete-icon.svg';

const DeleteFoodModal = ({ isOpen, onClose, foodId, foodName }) => {
  if (!isOpen) return null;

  const apiBaseURL = process.env.REACT_APP_SERVER;
  // Function to delete food item from inventory
  const handleDeleteFood = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/inventory/${foodId}`, {
      discarded: 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      onClose();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an issue with deleting this food item. Please try deleting this food item later.");
    })
  };

  return (  
    <div className="overlay">
      <div className="deletefoodmodal">
        <div className="deletefoodmodal__heading-container">
          <img className="deletefoodmodal__delete-icon" src={deleteIcon} alt='delete icon'/>
          <h5 className="deletefoodmodal__heading">Delete Item</h5>
        </div>
        <div className="deletefoodmodal__text-container">
          <p className="deletefoodmodal__text">Are you sure you want to delete "{foodName}" from your inventory?</p>
        </div>
        <div className="deletefoodmodal__button-container">
          <button className="deletefoodmodal__button-cancel" onClick={onClose}>Cancel</button>
          <button className="deletefoodmodal__button-delete" onClick={handleDeleteFood}>Delete</button>
        </div>
      </div>
    </div>
  );
};
  
export default DeleteFoodModal;
//Delete Food Modal Component

import './DeleteFoodModal.scss';
import axios from 'axios';


const DeleteFoodModal = ({ isOpen, onClose, foodId, foodName }) => {
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090'

  const onDelete = (event) => {
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
    .then((response) => {
      onClose();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an issue with deleting this food item. Please try deleting this food item later.");
      })
    };

    return (
      <>
        <div className="overlay">
        <div className="deleteinvmodal">

          <h1 className="deleteinvmodal__heading">Delete {foodName}?</h1>
          <p className="deleteinvmodal__text">Please confirm that you’d like to delete {foodName} from the inventory list. <br/>You won’t be able to undo this action.</p>
          
          <button className="deleteinvmodal__cancel-button" onClick={onClose}>Cancel</button>
          <button className="deleteinvmodal__delete-button" onClick={onDelete}>Delete</button>
        </div>
        </div>
      </>
    );
  };
  
  export default DeleteFoodModal;
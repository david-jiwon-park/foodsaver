//Edit Food Modal Component

import './EditFoodModal.scss';
import axios from 'axios';


const EditFoodModal = ({ isOpen, onClose, foodId, foodName, foodExpDate }) => {
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090'

  const onEdit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/inventory/${foodId}`, {
      food_item: e.target.food_item.value,
      exp_date: e.target.exp_date.value, 
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
      alert("There was an issue with editing this food item. Please try editing this food item later.");
      })
    };

  return (
    <>
      <div className="overlay">
      <div className="deleteinvmodal">
        <form onSubmit={onEdit}>
          
          <label htmlFor="quantity" className="add-inventory__label">Food Item</label>
            <input
                  className="add-inventory__quantity-field"
                  name="food_item"
                  id="food_item"
                  type="text"
                  placeholder={foodName}
                  required>
            </input>
            
            <label htmlFor="quantity" className="add-inventory__label">Expiration Date</label>
            <input
                className="add-inventory__quantity-field"
                name="exp_date"
                id="exp_date"
                type="date"
                placeholder={foodExpDate}
                required>
            </input>

          <button type="button" className="deleteinvmodal__cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="deleteinvmodal__delete-button">Edit</button>
        </form>
      </div>
      </div>
    </>
  );
  };
  
  export default EditFoodModal;
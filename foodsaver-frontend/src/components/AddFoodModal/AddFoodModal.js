//Delete Inventory Modal Component

import axios from 'axios';

const AddFoodModal = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090';

  const handleAddFood = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');
    axios
    .post(`${apiBaseURL}/inventory`, {
      food_item: e.target.food_item.value,
      exp_date: e.target.exp_date.value, 
      
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
      alert("There was an issue with adding this item. Please try adding this item later.");
    })
  };

  return (
    <>
      <div className="overlay">
      <div className="deleteinvmodal">
        <form onSubmit={handleAddFood}>
          
          <label htmlFor="quantity" className="add-inventory__label">Food Item</label>
          <input
                className="add-inventory__quantity-field"
                name="food_item"
                id="food_item"
                type="text"
                required>
          </input>
          
          <label htmlFor="quantity" className="add-inventory__label">Expiration Date</label>
          <input
              className="add-inventory__quantity-field"
              name="exp_date"
              id="exp_date"
              type="date"
              required>
          </input>

          <button type="button" className="deleteinvmodal__cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="deleteinvmodal__delete-button">Add</button>
        </form>
      </div>
      </div>
    </>
  );
  };
  
  export default AddFoodModal;
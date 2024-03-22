//Add Inventory Modal Component

import './AddFoodModal.scss';
import axios from 'axios';
import addIcon from '../../assets/icons/add-icon.png';

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
    <div className="overlay">
      <div className="addfoodmodal">
          <form className="addfoodmodal__form" onSubmit={handleAddFood}>
            
            <div className="addfoodmodal__heading-container">
              <img className="addfoodmodal__add-icon" src={addIcon} alt='add icon'/>
              <h5 className="addfoodmodal__heading">Add Item</h5>
            </div>
            
            <div className="addfoodmodal__field-container-1">
              <label htmlFor="food_item" className="addfoodmodal__label">Food Item:</label>
              <input
                    className="addfoodmodal__field-1"
                    name="food_item"
                    id="food_item"
                    type="text"
                    required>
              </input>
            </div>
            
            <div className="addfoodmodal__field-container-2">
              <label htmlFor="exp_date" className="addfoodmodal__label">Expiry Date:</label>
              <input
                  className="addfoodmodal__field-2"
                  name="exp_date"
                  id="exp_date"
                  type="date"
                  placeholder=""
                  required>
              </input>
            </div>

            <div className="addfoodmodal__button-container">
              <button type="button" className="addfoodmodal__button-cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="addfoodmodal__button-add">Add</button>
            </div>

          </form>
      </div>
    </div> 
   );
  };
  
  export default AddFoodModal;
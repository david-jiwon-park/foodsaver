//Edit Food Modal Component

import './EditFoodModal.scss';
import axios from 'axios';
import editIcon from '../../assets/icons/edit-icon.svg';


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
    <div className="overlay">
      <div className="editfoodmodal">
        <form className="editfoodmodal__form" onSubmit={onEdit}>

          <div className="editfoodmodal__heading-container">
            <img className="editfoodmodal__edit-icon" src={editIcon} alt='edit icon'/>
            <h5 className="editfoodmodal__heading">Edit Item</h5>
          </div>
          
          <div className="editfoodmodal__field-container-1">
            <label htmlFor="food_item" className="editfoodmodal__label">Food Item:</label>
            <input
                className="editfoodmodal__field-1"
                name="food_item"
                id="food_item"
                type="text"
                defaultValue={foodName}
                required>
            </input>
          </div>
            
          <div className="editfoodmodal__field-container-2">
            <label htmlFor="exp_date" className="editfoodmodal__label">Expiry Date:</label>
            <input
                className="editfoodmodal__field-2"
                name="exp_date"
                id="exp_date"
                type="date"
                defaultValue={foodExpDate}
                required>
            </input>
          </div>  

          <div className="editfoodmodal__button-container">
            <button type="button" className="editfoodmodal__button-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="editfoodmodal__button-save">Save</button>
          </div>

        </form>
      </div>
    </div>
    
  );
  };
  
  export default EditFoodModal;
//Delete Recipe Modal Component

import './DeleteRecipeModal.scss';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete-icon.svg';


const DeleteRecipeModal = ({ isOpen, onClose, name, uri }) => {
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090'

  const deleteFavRecipe = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .delete(`${apiBaseURL}/favorites/${uri}`, {
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
      <div className="deleterecipemodal">

        <div className="deleterecipemodal__heading-container">
          <img className="deleterecipemodal__delete-icon" src={deleteIcon} alt='delete icon'/>
          <h5 className="deleterecipemodal__heading">Delete Recipe</h5>
        </div>

        <div className="deleterecipemodal__text-container">
          <p className="deleterecipemodal__text">Are you sure you want to delete "{name}" from your favorites?</p>
        </div>

        <div className="deleterecipemodal__button-container">
          <div className="deleterecipemodal__buttons">
            <button className="deleterecipemodal__button-cancel" onClick={onClose}>Cancel</button>
            <button className="deleterecipemodal__button-delete" onClick={deleteFavRecipe}>Delete</button>
          </div>
        </div>

      </div>
    </div>
      
    );
  };
  
  export default DeleteRecipeModal;
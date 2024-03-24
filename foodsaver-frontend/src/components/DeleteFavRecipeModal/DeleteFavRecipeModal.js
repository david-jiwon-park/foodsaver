// Delete Favorite Recipe Modal Component

import './DeleteFavRecipeModal.scss';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete-icon.svg';

const DeleteFavRecipeModal = ({ isOpen, onClose, name, uri }) => {
  if (!isOpen) return null;

  const apiBaseURL = process.env.REACT_APP_SERVER;
  // Function to delete recipe that has been favorited 
  const handleDeleteFavRecipe = () => {
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
      <div className="deletefavrecipemodal">
        <div className="deletefavrecipemodal__heading-container">
          <img className="deletefavrecipemodal__delete-icon" src={deleteIcon} alt='delete icon'/>
          <h5 className="deletefavrecipemodal__heading">Delete Recipe</h5>
        </div>
        <div className="deletefavrecipemodal__text-container">
          <p className="deletefavrecipemodal__text">Are you sure you want to delete "{name}" from your favorites?</p>
        </div>
        <div className="deletefavrecipemodal__button-outer-container">
          <div className="deletefavrecipemodal__button-inner-container">
            <button className="deletefavrecipemodal__button-cancel" onClick={onClose}>Cancel</button>
            <button className="deletefavrecipemodal__button-delete" onClick={handleDeleteFavRecipe}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default DeleteFavRecipeModal;
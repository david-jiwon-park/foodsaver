// Delete User Modal Component

import './DeleteUserModal.scss';
import axios from 'axios';

const DeleteUserModal = ({ isOpen, onClose, setIsLoggedIn }) => {
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090'

  // Function to delete user
  const handleDeleteUser = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .delete(`${apiBaseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      alert("Your account has been deleted.");
      sessionStorage.setItem('loggedIn', JSON.stringify(false));
      sessionStorage.clear();
      setIsLoggedIn(false);
    })
    .catch((error) => {
      console.log(error);
      alert("There was an issue with deleting your account. Please try again later.");
    })
  };

  return (  
    <div className="overlay">
      <div className="deleteusermodal">
        <div className="deleteusermodal__heading-container">
          <h5 className="deleteusermodal__heading">Delete Account</h5>
        </div>
        <div className="deleteusermodal__text-container">
          <p className="deleteusermodal__text">Are you sure you want to delete your account? This cannot be undone!</p>
        </div>
        <div className="deleteusermodal__button-outer-container">
          <div className="deleteusermodal__button-inner-container">
            <button className="deleteusermodal__button-cancel" onClick={onClose}>Cancel</button>
            <button className="deleteusermodal__button-delete" onClick={handleDeleteUser}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default DeleteUserModal;
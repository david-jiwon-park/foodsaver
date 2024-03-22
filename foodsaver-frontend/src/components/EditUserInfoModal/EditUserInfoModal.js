//Edit User Info Modal Component

import './EditUserInfoModal.scss';
import { useState } from 'react';
import axios from 'axios';
import editIcon from '../../assets/icons/edit-icon.svg';


const EditUserInfoModal = ({ isOpen, onClose, userName, userEmail }) => {
  const [editUserErrorMessage, setEditUserErrorMessage] = useState("");
  
  if (!isOpen) return null;

  const apiBaseURL = 'http://localhost:8090'

  const onEdit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');
    
    axios
    .put(`${apiBaseURL}/users`, {
      name: e.target.name.value,
      email: e.target.email.value, 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      alert("User information has been updated!")
      onClose();
    })
    .catch((error) => {
      console.log(error);
      setEditUserErrorMessage(error.response.data.message);
      })
    };

  return (
    <div className="overlay">
      <div className="edituserinfomodal">
        <form onSubmit={onEdit}>

          <div className="edituserinfomodal__heading-container">
            <img className="edituserinfomodal__edit-icon" src={editIcon} alt='edit icon'/>
            <h5 className="edituserinfomodal__heading">Edit User Info</h5>
          </div>
          
          <div className="edituserinfomodal__field-container-1">
            <label htmlFor="name" className="edituserinfomodal__label">Name:</label>
            <input
                  className="edituserinfomodal__field-1"
                  name="name"
                  id="name"
                  type="text"
                  defaultValue={userName}
                  required>
            </input>
          </div>
            
          <div className="edituserinfomodal__field-container-2">
            <label htmlFor="email" className="edituserinfomodal__label edituserinfomodal__label--email">Email:</label>
            <input
                className="edituserinfomodal__field-2"
                name="email"
                id="email"
                type="email"
                defaultValue={userEmail}
                required>
            </input>
          </div>  

          <p className="edituserinfomodal__edit-error">{editUserErrorMessage}</p>

          <div className="edituserinfomodal__button-container">
            <button type="button" className="edituserinfomodal__button-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="edituserinfomodal__button-save">Save</button>
          </div>

        </form>
      </div>
    </div>
    
  );
  };
  
  export default EditUserInfoModal;
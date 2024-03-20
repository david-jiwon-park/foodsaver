//Change Password Modal Component

import './ChangePasswordModal.scss';
import { useState } from 'react';
import axios from 'axios';
import editIcon from '../../assets/icons/edit-icon.svg';


const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  
  if (!isOpen) return null;

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    // Clear password match error when the new password changes
    setPasswordMatchError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // Check password match when the confirm password changes
    if (newPassword !== event.target.value) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
    }
  };

  const apiBaseURL = 'http://localhost:8090'

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (e.target.new_password.value !== e.target.confirm_password.value) {
      return alert("Please ensure the passwords entered match.")
    } 
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/users/password`, {
      password: e.target.confirm_password.value 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      alert("Your password has been updated!")
      onClose();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an issue with changing your password. Please try again later.");
      })
    };

  return (
    <div className="overlay">
      <div className="changepasswordmodal">
        <form onSubmit={handleChangePassword}>

          <div className="changepasswordmodal__heading-container">
            <img className="changepasswordmodal__edit-icon" src={editIcon} alt='edit icon'/>
            <h5 className="changepasswordmodal__heading">Change Password</h5>
          </div>
            
          <div className="changepasswordmodal__field-container-1">
            <label htmlFor="new_password" className="changepasswordmodal__label">New Password</label>
            <input
                className="changepasswordmodal__field-1"
                name="new_password"
                id="new_password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                type="password"
                required>
            </input>
          </div>  

          <div className="changepasswordmodal__field-container-2">
            <label htmlFor="confirm_password" className="changepasswordmodal__label">Confirm Password</label>
            <input
                className="changepasswordmodal__field-2"
                name="confirm_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                type="password"
                required>
            </input>
          </div>  

          <p className='changepasswordmodal__password-match-error'>{passwordMatchError}</p>

          <div className="changepasswordmodal__button-container">
            <button type="button" className="changepasswordmodal__button-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="changepasswordmodal__button-save">Save</button>
          </div>

        </form>
      </div>
    </div>
    
  );
  };
  
  export default ChangePasswordModal;
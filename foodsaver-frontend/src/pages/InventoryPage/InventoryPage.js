import './InventoryPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal';
import DeleteFoodModal from '../../components/DeleteFoodModal/DeleteFoodModal';
import EditFoodModal from '../../components/EditFoodModal/EditFoodModal';
import getUserInventory from '../../utils/getUserInventory';
import { daysUntilExpiration } from '../../utils/daysUntilExpiration';
import addIcon from '../../assets/icons/add-icon.png';
import editIcon from '../../assets/icons/edit-icon.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';

const InventoryPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isDeleteFoodModalOpen, setIsDeleteFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  const [modalFoodId, setModalFoodId] = useState(null);
  const [modalFoodName, setModalFoodName] = useState("");
  const [modalFoodExpDate, setModalFoodExpDate] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory({ setUserInventory });
    } else {
      navigate('/');
    }
    }, [isLoggedIn, isAddFoodModalOpen, isDeleteFoodModalOpen, isEditFoodModalOpen]);

  const handleOpenAddFoodModal = () => {
    setIsAddFoodModalOpen(true);
  };
  const handleCloseAddFoodModal = () => {
    setIsAddFoodModalOpen(false);
  };

  const handleOpenDeleteFoodModal = (foodId, foodName) => {
    setModalFoodId(foodId);
    setModalFoodName(foodName);
    setIsDeleteFoodModalOpen(true);
  };
  const handleCloseDeleteFoodModal = () => {
    setIsDeleteFoodModalOpen(false);
  };

  const handleOpenEditFoodModal = (foodId, foodName, foodExpDate) => {
    setModalFoodId(foodId);
    setModalFoodName(foodName);
    setModalFoodExpDate(foodExpDate);
    setIsEditFoodModalOpen(true);
  };
  const handleCloseEditFoodModal = () => {
    setIsEditFoodModalOpen(false);
  };

  let itemContainerClass = "inventory-page__item-container";
  const expDateStyling = (date) => {
    if (daysUntilExpiration(date) === "Expired!") {
      itemContainerClass = "inventory-page__item-container inventory-page__item-container--expired";
    } else if (daysUntilExpiration(date) <= 3) {
      itemContainerClass = "inventory-page__item-container inventory-page__item-container--warning";
    } else {
      itemContainerClass = "inventory-page__item-container";
    }
    return itemContainerClass;
  };

  const expDateText = (date) => {
    if (daysUntilExpiration(date) === "Expired!") {
      return;
    } else if (daysUntilExpiration(date) === 1) {
      return 'day'
    } else {
      return "days";
    }
  };

  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="inventory-page">
        <div className="inventory-page__heading-container">
          <h1 className="inventory-page__heading">Inventory</h1>
          <div className="inventory-page__add-button-container">
            <button className="inventory-page__add-button" onClick={() => handleOpenAddFoodModal()}>Add Item</button>
            <img className="inventory-page__add-icon" src={addIcon} alt="add icon"/>
          </div>
        </div>

        <AddFoodModal 
          isOpen={isAddFoodModalOpen} 
          onClose={handleCloseAddFoodModal} 
        />

        <div className="inventory-page__subheading-container">
          <h4 className="inventory-page__subheading">Food Item</h4>
          <h4 className="inventory-page__subheading">Expires In</h4>
        </div>


        {userInventory.filter((item) => {
          return item.discarded == 0
        })
        .map((item) => (
          <div className={expDateStyling(item.exp_date)} key={item.id}>
            <p className="inventory-page__item-name">{item.food_item}</p>
            <p className="inventory-page__item-exp">{daysUntilExpiration(item.exp_date)} {expDateText(item.exp_date)}</p>
            <img className="inventory-page__edit-icon" src={editIcon} alt="edit icon" onClick={() => handleOpenEditFoodModal(item.id, item.food_item, item.exp_date)}/>
            <img className="inventory-page__delete-icon" src={deleteIcon} alt="delete icon" onClick={() => handleOpenDeleteFoodModal(item.id, item.food_item)}/>
          </div>
        ))}
        <EditFoodModal 
          isOpen={isEditFoodModalOpen} 
          onClose={handleCloseEditFoodModal} 
          foodId={modalFoodId} 
          foodName={modalFoodName}
          foodExpDate={modalFoodExpDate}
        />
        <DeleteFoodModal 
          isOpen={isDeleteFoodModalOpen} 
          onClose={handleCloseDeleteFoodModal} 
          foodId={modalFoodId} 
          foodName={modalFoodName}
        />
      </div>
    </>
  )
};

export default InventoryPage;
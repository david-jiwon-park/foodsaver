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
  
  // State to retrieve and store data regarding the user's inventory
  const [userInventory, setUserInventory] = useState([]);

  // States to keep track of when modals are open or closed 
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isDeleteFoodModalOpen, setIsDeleteFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  
  // States to pass food item information to modals
  const [modalFoodId, setModalFoodId] = useState(null);
  const [modalFoodName, setModalFoodName] = useState("");
  const [modalFoodExpDate, setModalFoodExpDate] = useState(null);
  
  // Loading and loading error states 
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory()
      .then((response) => {
        // Sorting the inventory from earliest to latest expiration date 
        const sortedData = response.data.sort((a, b) => new Date(a.exp_date) - new Date(b.exp_date));
        setUserInventory(sortedData);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(true);
        console.log(error);
      })
    } else {
      navigate('/');
    }
    }, [isLoggedIn, isAddFoodModalOpen, isDeleteFoodModalOpen, isEditFoodModalOpen]);

  // Functions to handle opening/closing modals
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

  // Functions that returns the appropriate item container class based on how soon the food item will expire 
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

  // Function that returns the appropriate text that comes right after the number of days the food item will expire in
  const expDateText = (date) => {
    if (daysUntilExpiration(date) === "Expired!") {
      return;
    } else if (daysUntilExpiration(date) === 1) {
      return 'day'
    } else {
      return "days";
    }
  };

  // Loading text to appear if the page still has not loaded after 800 milliseconds and there was no loading error
  useEffect(() => {
    setTimeout(() => {
      if (loading && !loadingError) {
        setLoadingText("Loading...")
      } else {
        setLoadingText("");
      }
    }, 800)
  }, [loading, loadingError]);

  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      {!loading && loadingError ? 
      (<h1 className="loading-error">Failed to load page</h1>)
      : null 
      }
      {!loading && !loadingError ? 
      (<div className="inventory-page">
        <div className="inventory-page__heading-container">
          <h1 className="inventory-page__heading">Inventory</h1>
          <div className="inventory-page__add-button-container">
            <button className="inventory-page__add-button" onClick={() => handleOpenAddFoodModal()}>Add Item</button>
            <img className="inventory-page__add-icon" src={addIcon} alt="add icon"/>
          </div>
        </div>
        {userInventory.length === 0 ? 
        (<p className="inventory-page__no-inventory-text">
          Start adding food by clicking the 
          <span> Add Item </span> 
          button!
        </p>)
        : 
        (<>
          <div className="inventory-page__subheading-container">
            <h4 className="inventory-page__subheading">Food Item</h4>
            <h4 className="inventory-page__subheading inventory-page__subheading--right">Expires In</h4>
          </div>
          <div className="inventory-page__item-outer-container">
            {userInventory.filter((item) => {
              return item.discarded === 0
            })
            .map((item) => (
              <div className={expDateStyling(item.exp_date)} key={item.id}>
                <p className="inventory-page__item-name">{item.food_item}</p>
                <p className="inventory-page__item-exp">{daysUntilExpiration(item.exp_date)} {expDateText(item.exp_date)}</p>
                <img className="inventory-page__edit-icon" src={editIcon} alt="edit icon" onClick={() => handleOpenEditFoodModal(item.id, item.food_item, item.exp_date)}/>
                <img className="inventory-page__delete-icon" src={deleteIcon} alt="delete icon" onClick={() => handleOpenDeleteFoodModal(item.id, item.food_item)}/>
              </div>
            ))}
          </div>
        </>)}
        <AddFoodModal 
          isOpen={isAddFoodModalOpen} 
          onClose={handleCloseAddFoodModal} 
        />
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
      </div>) 
      : 
      (<h1 className="inventory-page__loading">{loadingText}</h1>)}
    </>
  );
};

export default InventoryPage;
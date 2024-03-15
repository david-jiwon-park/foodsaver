import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../components/Header/Header'
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal';
import DeleteFoodModal from '../../components/DeleteFoodModal/DeleteFoodModal';
import EditFoodModal from '../../components/EditFoodModal/EditFoodModal';
import getUserInventory from '../../utils/getUserInventory';
import { daysUntilExpiration } from '../../utils/daysUntilExpiration';

const InventoryPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isDeleteFoodModalOpen, setIsDeleteFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  const [modalFoodId, setModalFoodId] = useState(null);
  const [modalFoodName, setModalFoodName] = useState("");
  const [modalFoodExpDate, setModalFoodExpDate] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <div>
        <h1>Inventory</h1>
        <button onClick={() => handleOpenAddFoodModal()}>Add Food</button>
        <AddFoodModal 
          isOpen={isAddFoodModalOpen} 
          onClose={handleCloseAddFoodModal} 
        />

        {userInventory.filter((item) => {
          return item.discarded == 0
        })
        .map((item) => (
          <div key={item.id}>
            <h3>{item.food_item}</h3>
            <p>{daysUntilExpiration(item.exp_date)}</p>
            <button onClick={() => handleOpenEditFoodModal(item.id, item.food_item, item.exp_date)}>Edit Food</button>
            <button onClick={() => handleOpenDeleteFoodModal(item.id, item.food_item)}>Delete Food</button>
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
    </div>
  )
};

export default InventoryPage;
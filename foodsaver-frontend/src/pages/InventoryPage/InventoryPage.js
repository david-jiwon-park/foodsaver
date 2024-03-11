import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../components/Header/Header'
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal';
import DeleteFoodModal from '../../components/DeleteFoodModal/DeleteFoodModal';
import getUserInventory from '../../utils/getUserInventory';

const InventoryPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isDeleteFoodModalOpen, setIsDeleteFoodModalOpen] = useState(false);
  const [modalFoodId, setModalFoodId] = useState(null);
  const [modalFoodName, setModalFoodName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory({ setUserInventory });
    } else {
      navigate('/login');
    }
    }, [isLoggedIn, isAddFoodModalOpen, isDeleteFoodModalOpen]);

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
            <p>{item.exp_date}</p>
            <button onClick={() => handleOpenDeleteFoodModal(item.id, item.food_item)}>Delete Food</button>
          </div>
        ))}
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
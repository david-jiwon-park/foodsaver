import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const UserProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [userInventory, setUserInventory] = useState([]);


    return (
        <div>
            <Header 
                setIsLoggedIn={setIsLoggedIn}
            />
            <h1>User Profile Page</h1>


        </div>
    )
}

export default UserProfilePage;
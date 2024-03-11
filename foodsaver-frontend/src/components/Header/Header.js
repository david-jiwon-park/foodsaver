import { Link, useNavigate } from 'react-router-dom';

const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.setItem('loggedIn', JSON.stringify(false));
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return(
    <div>
        <Link className="header__nav-link" to="/">Inventory</Link>
        <Link className="header__nav-link" to="/recipes">Recipes</Link>
        <Link className="header__nav-link" to="/profile">User Profile</Link>

        <button className="UserProfile__logout-button" onClick={handleLogOut}>
            Log Out
        </button>
    </div>

    )
};

export default Header;
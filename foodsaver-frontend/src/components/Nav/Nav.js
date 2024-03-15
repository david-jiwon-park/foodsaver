import './Nav.scss'
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ isOpen }) => {
  if (!isOpen) return null;
  

  return(
    <div className="nav">
      <div className="nav__container">
        <Link className="nav__link" to="/inventory">
          <button className='nav__button'>Inventory</button>
        </Link>
        <Link className="nav__link" to="/recipes">
          <button className='nav__button'>Recipes</button>
        </Link>
        <Link className="nav__link" to="/favorites">
          <button className='nav__button'>Favorites</button>
        </Link>
        <Link className="nav__link" to="/profile">
          <button className='nav__button'>User Profile</button>
        </Link>
      </div>
      
    </div>

    )
};

export default Nav;
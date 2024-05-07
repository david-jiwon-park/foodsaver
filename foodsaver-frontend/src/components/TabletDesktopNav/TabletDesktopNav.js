import './TabletDesktopNav.scss'
import { Link } from 'react-router-dom';
import userIcon from '../../assets/icons/user-icon.png';

const TabletDesktopNav = () => {

    return(
      <div className="nav">
        <div className="nav__container">
          <Link className="nav__link" to="/inventory">Inventory</Link>
          <Link className="nav__link" to="/recipes">Recipes</Link>
          <Link className="nav__link" to="/favorites">Favorites</Link>
        </div>
        <div className="nav__profile-link">
            <Link to="/profile">
                <img className="nav__user-icon" src={userIcon} alt="user icon"/>
            </Link>
        </div>
      </div>
    )
  };
  
  export default TabletDesktopNav;

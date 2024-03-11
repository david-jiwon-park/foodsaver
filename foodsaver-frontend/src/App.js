import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem('loggedIn')));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/signup" 
            element={<SignupPage/>}
          />    
          <Route 
            path="/login" 
            element={
              <LoginPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route 
            path="/" 
            element={
              <InventoryPage
                isLoggedIn={isLoggedIn}
            />
          }
          /> 
          <Route 
            path="/recipes" 
            element={
              <RecipesPage
                isLoggedIn={isLoggedIn}
              />
            }
          /> 
          <Route 
            path="/profile" 
            element={
              <UserProfilePage
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

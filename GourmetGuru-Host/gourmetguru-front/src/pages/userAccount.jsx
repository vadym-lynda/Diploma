import React, { useEffect, useState, useContext } from 'react';
import { checkUserRole } from "../api/authorised";
import { AuthContext } from '../api/AuthContext';
import Header from "../components/Header";
import UserAccInfo from './userAccPages/userAccInfo';
import UserFavoriteDishes from './userAccPages/UserFavoriteDishes';
import EditRecipes from './userAccPages/EditRecipes';
import UpdateItem from './userAccPages/UpdateItem';

function UserAccount() {
  const { isAuthorised } = useContext(AuthContext);
  const storedRole = localStorage.getItem('user_role');
  const storedSub = localStorage.getItem('user_sub');
  const storedEmail = localStorage.getItem('user_email');
  
  const [userRole, setUserRole] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    if (isAuthorised) {
      const role = checkUserRole(storedRole);
      setUserRole(role);
    }
  }, [isAuthorised, storedRole]); // Змінив `decoded` на `storedRole`

  const handleNavigateToUserAccInfo = () => {
    setSelectedPage('userAccInfo');
  };

  const handleNavigateToFavouriteDishes = () => {
    setSelectedPage('userFavouriteDishes');
  };

  const handleNavigateToEditRecipes = () => {
    setSelectedPage('editRecipes');
  };

  return (
    <>
      <Header isAuthorised={isAuthorised} />
      <div className="main-content-top">
        <ul>
          <li><a onClick={handleNavigateToFavouriteDishes}><h4>Збережені рецепти</h4></a></li>
          {userRole && (
            <>
              <li><a onClick={handleNavigateToEditRecipes}><h4>Редагувати рецепти</h4></a></li>
              <li><a><h4>Добавити рецепти</h4></a></li>
            </>
          )}
          <li><a onClick={handleNavigateToUserAccInfo}><h4>Персональна інформація</h4></a></li>
        </ul>
      </div>
  
      {selectedPage === 'userAccInfo' && <UserAccInfo role={storedRole} email={storedEmail} sub={storedSub} />}
      {selectedPage === 'userFavouriteDishes' && <UserFavoriteDishes />}
      {selectedPage === 'editRecipes' && <EditRecipes />}
      {selectedPage === 'UpdateItem' && <UpdateItem />}
    </>
  );
}

export default UserAccount;

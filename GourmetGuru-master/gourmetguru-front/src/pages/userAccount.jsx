import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { checkUserRole } from "../api/authorised";
import { AuthContext } from '../api/AuthContext';
import Header from "../components/Header";
import UserAccInfo from './userAccPages/userAccInfo';
import UserFavoriteDishes from './userAccPages/UserFavoriteDishes';
import EditRecipes from './userAccPages/EditRecipes';
import UpdateItem from './userAccPages/UpdateItem';
import CreateItem from './userAccPages/CreateItem'; // Import CreateItem component

function UserAccount() {
  const { isAuthorised } = useContext(AuthContext);
  const location = useLocation();
  const storedRole = localStorage.getItem('user_role');
  const storedSub = localStorage.getItem('user_sub');
  const storedEmail = localStorage.getItem('user_email');
  const [userRole, setUserRole] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (isAuthorised) {
      const role = checkUserRole(storedRole);
      setUserRole(role);
    }

    if (location.state) {
      if (location.state.page === 'updateItem') {
        setSelectedPage('updateItem');
        setSelectedItemId(location.state.itemId);
      } else if (location.state.page === 'createItem') {
        setSelectedPage('createItem');
      }
    }
  }, [isAuthorised, storedRole, location.state]);

  const handleNavigateToUserAccInfo = () => {
    setSelectedPage('userAccInfo');
  };
  const handleNavigateToFavouriteDishes = () => {
    setSelectedPage('userFavouriteDishes');
  };
  const handleNavigateToEditRecipes = () => {
    setSelectedPage('editRecipes');
  };
  const handleNavigateToCreateItem = () => {
    setSelectedPage('createItem');
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
              <li><a onClick={handleNavigateToCreateItem}><h4>Добавити рецепти</h4></a></li>
            </>
          )}
          <li><a onClick={handleNavigateToUserAccInfo}><h4>Персональна інформація</h4></a></li>
        </ul>
      </div>

      {selectedPage === 'userAccInfo' && <UserAccInfo role={storedRole} email={storedEmail} sub={storedSub} setSelectedPage={setSelectedPage} />}
      {selectedPage === 'userFavouriteDishes' && <UserFavoriteDishes setSelectedPage={setSelectedPage} />}
      {selectedPage === 'editRecipes' && <EditRecipes setSelectedPage={setSelectedPage} />}
      {selectedPage === 'updateItem' && <UpdateItem itemId={selectedItemId} setSelectedPage={setSelectedPage} />}
      {selectedPage === 'createItem' && <CreateItem setSelectedPage={setSelectedPage} />}
    </>
  );
}

export default UserAccount;

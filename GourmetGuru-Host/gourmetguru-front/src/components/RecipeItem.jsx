import React, { useState, useContext} from 'react';
import { AuthContext } from '../api/AuthContext';
import DataProvider from '../api/dataProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkUserRole } from "../api/authorised";

function RecipeItem({ recipe }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthorised } = useContext(AuthContext);
  const { name, type, difficulty, cuisine } = recipe;
  const countryName = cuisine.name;
  const [selectedItemId, setSelectedItemId] = useState();

  const handleClickCook = async () => {
    const newSelectedItemId = recipe.id;
    setSelectedItemId(prevSelectedItemId => {
      if (prevSelectedItemId === newSelectedItemId) {
        return null; 
      }
      return newSelectedItemId; 
    });

    const route = `http://localhost:8080/api/dishes`;
    const token = localStorage.getItem('userToken');

    try {
      if (isAuthorised) {
        const data = await DataProvider.getOne(newSelectedItemId, route, token);
        console.log(data);
        navigate('/Recipe', { state: { recipeData: data } }); 
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleClickDelete = async () => {
    const newSelectedItemId = recipe.id;
    setSelectedItemId(prevSelectedItemId => {
      if (prevSelectedItemId === newSelectedItemId) {
        return null; 
      }
      return newSelectedItemId; 
    });
  
    // Використовуємо новий Promise для підтвердження видалення
    const confirmDelete = new Promise((resolve, reject) => {
      if (window.confirm("Ви впевнені в видаленні даного рецепту?")) {
        resolve(true); // користувач підтвердив видалення
      } else {
        reject(new Error('Видалення скасовано')); // користувач скасував видалення
      }
    });
  
    confirmDelete.then(async () => {
      const route = `http://localhost:8080/api/dishes`;
      const token = localStorage.getItem('userToken');
  
      try {
        if (isAuthorised) {
          const data = await DataProvider.deleteOne(newSelectedItemId, route, token);
          console.log(data);
          navigate('/');
        }
      } catch (error) {
        console.error('Error delete recipe:', error);
      }
    }).catch((error) => {
      console.log(error.message); // обробка випадку, коли видалення скасовано
    });
  };

  const isAdmin = isAuthorised && checkUserRole(localStorage.getItem('user_role'));
  const isUserAccountPage = location.pathname === '/UserAccount';

  return (
    <div className="recipe-item">
      <div className="card-bottom">
        <h3 className="card-name">{name}</h3>
        <div className="card-description">
          <ul>
            <li>Країна: {countryName}</li>
            <li>Тип страви: {type}</li>
            <li>Складність приготування: {difficulty}</li>
          </ul>
        </div>
        {isUserAccountPage && isAdmin && (
          <div className="btn-block">
            <button className="card-btn">Редагувати</button>
            <button className="card-btn" onClick={handleClickDelete}>Видалити</button>
          </div>
        )}
        {!isUserAccountPage && (
          <div className="btn-block">
            <button className="card-btn" onClick={handleClickCook}>Приготувати</button>
            <button className="card-btn">Зберегти</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeItem;
{/*
  

  */}
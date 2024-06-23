import React, { useState, useEffect, useContext } from 'react';
import RecipeItem from './RecipeItem.jsx';
import DataProvider from '../api/dataProvider.js';
import { AuthContext } from '../api/AuthContext';

function RecipeList({ route }) {
  const { isAuthorised } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function fetchRecipes() {
      try {
        if (isAuthorised) {
          const data = await DataProvider.getList(route, token);
          setRecipes(data);
         
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

    fetchRecipes();
  }, [isAuthorised, route, token]);

  if (recipes.length === 0) {
    return (
      <div>
        <h2>Помилка завантаження!</h2>
      </div>
    );
  }
  if (!isAuthorised) {
    return (
      <div>
        <h2>Необхідно зареєструватись!</h2>
      </div>
    );
  }

  return (
    <div className="all-recipes">
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe} 
        />
      ))}
    </div>
  );
}

export default RecipeList;

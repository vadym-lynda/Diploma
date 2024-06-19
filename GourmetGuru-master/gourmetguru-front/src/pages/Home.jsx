import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeList from '../components/recipeList';
import { AuthContext } from '../api/AuthContext';

function Home() {
  const { isAuthorised } = useContext(AuthContext);

  return (
    <>
      <Header isAuthorised={isAuthorised} />
      {isAuthorised ? (
        <>
          <div className="body-logo">
            <h2 className="body-logo-text">Best Recipes</h2>
          </div>
          
        </>
      ) : null}
      <RecipeList route="http://localhost:8080/api/dishes" />
    </>
  );
}

export default Home;

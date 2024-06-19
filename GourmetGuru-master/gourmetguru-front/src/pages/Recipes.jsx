import React, { useState, useEffect, useContext } from 'react';
import DataProvider from '../api/dataProvider';
import Header from "../components/Header";
import RecipeList from '../components/recipeList';
import { AuthContext } from '../api/AuthContext';


function Recipes() {
  const { isAuthorised } = useContext(AuthContext);
  const [cusines, setCusines] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function fetchCusines() {
      try {
        const data = await DataProvider.getList('http://localhost:8080/api/cuisines', token);
        setCusines(data);
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    }

    fetchCusines();
  }, [token]); // Added token to the dependency array

  if (cusines.length === 0) { // Changed from null to 0
    return (
      <div>
        <p>Пусто!</p>
      </div>
    );
  }

  return (
    <>
       <Header isAuthorised={isAuthorised} />
      <div className="menu">
        <div className="list-menu">
          <form action="" className="check-form">
            <ul>
              <div className="check-country">
                <li><h3>Відбір за країною</h3></li>
                {cusines.map(cuisine => (
                  <li key={cuisine.id}> {/* Added key prop */}
                    <input type="checkbox" />
                    <label htmlFor="">{cuisine.name}</label> {/* Fixed: cuisine.name */}
                  </li>
                ))}
              </div>

              <div className="check-type">
                <li><h3>Відбір за типом</h3></li>
                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Перші страви</label>
                </li>

                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Холодні страви</label>
                </li>

                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Закуски</label>
                </li>

                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Салати</label>
                </li>
              </div>

              <div className="check-difficulty">
                <li><h3>Відбір за складністю</h3></li>
                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Легка</label>
                </li>

                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Середня</label>
                </li>

                <li>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Важка</label>
                </li>
              </div>
            </ul>
            <button className="card-btn check-form-btn">Пошук</button>
          </form>
        </div>
      </div>
      <RecipeList route='http://localhost:8080/api/dishes' />
    </>
  );
}

export default Recipes;

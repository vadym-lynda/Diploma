import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../api/AuthContext';
import { checkUserRole } from "../../api/authorised";
import DataProvider from '../../api/dataProvider';

const types = [
  { id: 0, name: 'Холодні страви' },
  { id: 1, name: 'Перші страви'},
  { id: 2, name: 'Основні страви' },
  { id: 3, name: 'Гарніри' },
  { id: 4, name: 'Десерти' },
  { id: 5, name: 'Напої' }
];

const difficulties = [
  { id: 0, name: 'Простий' },
  { id: 1, name: 'Середній' },
  { id: 2, name: 'Складний' },
  { id: 3, name: 'Дуже складний' },
  { id: 4, name: 'Професійний' }
];

function UpdateItem({ itemId, setSelectedPage }) {
  const { isAuthorised } = useContext(AuthContext);
  const [data, setData] = useState({
    name: '',
    type: '',
    difficulty: '',
    youtubeVideoUrl: '',
    description: '',
    cuisine: null,
  });

  const [cuisines, setCuisines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const route = `http://localhost:8080/api/cuisines`;
        const token = localStorage.getItem('userToken');
        const response = await DataProvider.getList(route, token);
        setCuisines(response);
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };

    const fetchRecipeById = async (id) => {
      try {
        const route = `http://localhost:8080/api/dishes`;
        const token = localStorage.getItem('userToken');
        const response = await DataProvider.getOne(id,route, token);
        setData({
          name: response.name || '',
          type: response.type || '',
          difficulty: response.difficulty || '',
          youtubeVideoUrl: response.youtubeVideoUrl || '',
          description: response.description || '',
          cuisine: response.cuisine || null,
        });
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setErrorMessage('Error fetching recipe data. Please try again.');
      }
    };

    fetchCuisines();
    if (itemId) {
      fetchRecipeById(itemId);
    }
  }, [itemId]);

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    const route = `http://localhost:8080/api/dishes`;
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('user_role');

    try {
      if (isAuthorised && checkUserRole(role)) {
        const response = await DataProvider.updateOne(data, itemId, route, token);
        console.log('Update response:', response);
        
          setSelectedPage(null);
        
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setErrorMessage('Error updating item. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCuisineChange = (e) => {
    const selectedCuisineId = e.target.value;
    const cuisine = cuisines.find(c => c.id.toString() === selectedCuisineId);
    setData((prevData) => ({
      ...prevData,
      cuisine: cuisine,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  return (
    <>
      <div className="register-form">
        <form className="form" onSubmit={handleClickUpdate}>
          <h1 className="form-title">Update</h1>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="form-group">
            <input
              className="form-input"
              placeholder=" "
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
            <label className="form-label">Name</label>
          </div>

          <div className="form-group">
            <select
              className="form-input"
              name="type"
              value={data.type || ''}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              className="form-input"
              name="difficulty"
              value={data.difficulty || ''}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Difficulty</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder=" "
              name="youtubeVideoUrl"
              value={data.youtubeVideoUrl}
              onChange={handleInputChange}
            />
            <label className="form-label">Video URL</label>
          </div>
          <div className="form-group">
            <textarea
              className="form-input"
              placeholder=" "
              name="description"
              value={data.description}
              onChange={handleInputChange}
            />
            <label className="form-label">Description</label>
          </div>
          <div className="form-group">
            <select
              className="form-input"
              value={data.cuisine ? data.cuisine.id : ''}
              onChange={handleCuisineChange}
            >
              <option value="" disabled>Select Cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          </div>
          <button className="form-btn" type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default UpdateItem;

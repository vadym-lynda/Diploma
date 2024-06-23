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

function CreateItem({setSelectedPage}) {
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
    // Fetch available cuisines from the API
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

    fetchCuisines();
  }, []);

  const handleClickCreate = async (e) => {
    e.preventDefault();

    if (!data.name || !data.type || !data.difficulty || !data.youtubeVideoUrl || !data.description || !data.cuisine) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const route = `http://localhost:8080/api/dishes`;
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('user_role');

    try {
      if (isAuthorised && checkUserRole(role)) {
        const response = await DataProvider.createOne(data, route, token);
        console.log('Create response:', response);
     
        setSelectedPage(null)
      
      }
    } catch (error) {
      console.error('Error creating item:', error);
      setErrorMessage('Error creating item. Please try again.');
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
        <form className="form" onSubmit={handleClickCreate}>
          <h1 className="form-title">Create</h1>
          
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
              value={data.type}
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
              value={data.difficulty}
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

          <button className="form-btn" type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default CreateItem;
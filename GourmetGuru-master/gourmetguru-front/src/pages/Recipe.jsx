import React, { useContext } from 'react';
import { AuthContext } from '../api/AuthContext';
import Header from '../components/Header.jsx';
import { useLocation } from 'react-router-dom';


function Recipe() {
  const {isAuthorised} = useContext(AuthContext)
  const location = useLocation();
  const recipeData = location.state.recipeData;
  console.log(recipeData)
  function extractVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/);
    return match && match[1];
  }

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  const { name, description, youtubeVideoUrl,cuisine,type, difficulty } = recipeData;
  const videoId = extractVideoId(youtubeVideoUrl);
  const countryName = cuisine.name;
  if (!videoId) {
    return <div>Помилка: Неправильне посилання на відео</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <>
      <Header isAuthorised={isAuthorised} />
      <div>
        <div className="all-recipe-page-items">
          <div className="recipe-page-top">
         
          
            <h2>{name}</h2>
            <div className="video-player">
              <iframe
                width="560"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              ></iframe>
            </div>
          </div>
          <div className="card-description">
          <ul>
            <li>Країна: {countryName}</li>
            <li>Тип страви: {type}</li>
            <li>Складність приготування: {difficulty}</li>
          </ul>
        </div>

          <div className="dish-recipe">
            <h3>Рецепт</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;

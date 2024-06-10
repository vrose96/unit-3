import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailScreen.css';

const DetailScreen = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://recipes.devmountain.com/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.error("Error fetching recipe: ", err);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="image-section">
        <img src={recipe.image_url || "https://via.placeholder.com/600x400"} alt={recipe.recipe_name} />
      </div>
      <div className="info-section">
        <h1>{recipe.recipe_name}</h1>
        <p><strong>Preparation Time:</strong> {recipe.prep_time} minutes</p>
        <p><strong>Cook Time:</strong> {recipe.cook_time} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Ingredients:</strong></p>
        {recipe.ingredients && recipe.ingredients.map((ing, index) => (
          <h4 key={index}>{ing.quantity} {ing.ingredient}</h4>
        ))}
        <p><strong>Instructions:</strong></p>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {recipe.instructions && JSON.parse(recipe.instructions)}
        </p>
      </div>
    </div>
  );
};

export default DetailScreen;

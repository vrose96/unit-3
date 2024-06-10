import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image_url || "https://via.placeholder.com/300x200"} alt={recipe.recipe_name} />
      <h2>{recipe.recipe_name}</h2>
      <button className="view-recipe-btn" onClick={handleClick}>View Recipe</button>
    </div>
  );
};

export default RecipeCard;


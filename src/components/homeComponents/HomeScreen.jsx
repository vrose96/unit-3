import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt2 } from 'react-icons/bi';
import AdBanner from './AdBanner';
import RecipeCard from './RecipeCard';
import './HomeScreen.css';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const getRecipes = () => {
    axios
      .get("https://recipes.devmountain.com/recipes")
      .then((res) => {
        setRecipes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching recipes: ", err);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const recipeDisplay = recipes
    .filter((recipe) => {
      let title = recipe.recipe_name.toLowerCase();
      let searchParams = search.toLowerCase();
      return title.includes(searchParams);
    })
    .map((recipe, index) => {
      return <RecipeCard key={index} recipe={recipe} />;
    });

  return (
    <div>
      <AdBanner />
      <div className="search-container">
        <span className="search-span">
          <BiSearchAlt2 size="2em" color="#DA7635" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a Recipe"
          />
        </span>
      </div>
      <div className="recipe-display">
        {recipeDisplay}
      </div>
      {/* Much code from Part 2 will be placed around here. Do your best! */}
    </div>
  );
}

export default HomeScreen;

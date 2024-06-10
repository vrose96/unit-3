import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import "./NewRecipeScreen.css";

const initialValues = {
  type: "",
  recipeName: "",
  imageURL: "",
  prepTime: "",
  cookTime: "",
  serves: "",
  ingredients: [],
  instructions: "",
};

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addIngredient = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const onSubmit = (values) => {
    values.ingredients = ingredients;
    axios
      .post("https://recipes.devmountain.com/recipes", values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error submitting the recipe!", error);
      });
  };

  return (
    <section>
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="recipe-form">
            <input
              placeholder="Title your Recipe!"
              value={values.recipeName}
              onChange={handleChange}
              name="recipeName"
            />
            <input
              placeholder="Enter Image URL"
              value={values.imageURL}
              onChange={handleChange}
              name="imageURL"
            />
            <input
              placeholder="Preparation Time (minutes)"
              value={values.prepTime}
              onChange={handleChange}
              name="prepTime"
            />
            <input
              placeholder="Cooking Time (minutes)"
              value={values.cookTime}
              onChange={handleChange}
              name="cookTime"
            />
            <input
              placeholder="Servings"
              value={values.serves}
              onChange={handleChange}
              name="serves"
            />
            <div className="ingredient-inputs">
              <input
                placeholder="Ingredient"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="button" className="orange-btn" onClick={addIngredient}>Add Ingredient</button>
            </div>
            {ingredients.map((ing, index) => (
              <div key={index} className="ingredient-list">
                <span>{ing.quantity} {ing.name}</span>
              </div>
            ))}
            <textarea
              placeholder="Describe the preparation steps"
              value={values.instructions}
              onChange={handleChange}
              name="instructions"
            ></textarea>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Cook"
                  checked={values.type === "Cook"}
                  onChange={handleChange}
                /> Cook
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Bake"
                  checked={values.type === "Bake"}
                  onChange={handleChange}
                /> Bake
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Drink"
                  checked={values.type === "Drink"}
                  onChange={handleChange}
                /> Drink
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;

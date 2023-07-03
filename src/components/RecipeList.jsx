import { Link } from "react-router-dom";
import "./RecipeList.css";
import DeleteIcon from "../assets/deleteIcon.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import React from "react";

function RecipeList({ recipes }) {
  const handleClick = (id) => {
    const docRef = doc(db, "recipes", id);
    deleteDoc(docRef).then(() => {
      console.log("deleted");
    });
  };

  if (recipes.length === 0) {
    return <p className="recipe-list">No Recipeis found</p>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} mins to cook.</p>
          <div>{recipe.method.substring(0, 100)}.....</div>
          <Link to={`/recipes/${recipe.id}`}>COOK THIS</Link>
          <img
            src={DeleteIcon}
            className="delete"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;

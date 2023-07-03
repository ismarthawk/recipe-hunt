import "./Create.css";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const colRef = collection(db, "recipes");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      ingredients,
      method,
      cookingTime,
    }).then(() => {
      navigate("/");
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [ing, ...prev]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={title}
            required
          />
        </label>

        <label>
          <span>Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        {ingredientInput && (
          <>
            <p>
              <strong>Current Ingredients : </strong>
            </p>
            {ingredients.map((ing) => (
              <p key={ing}>
                <em>{ing},</em>
              </p>
            ))}
          </>
        )}

        <label>
          <span>Recipe Method:</span>
          <textarea
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => {
              setCookingTime(e.target.value);
            }}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}

export default Create;

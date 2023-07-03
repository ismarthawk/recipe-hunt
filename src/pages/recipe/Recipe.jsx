import { useParams } from "react-router-dom";
import "./Recipe.css";
import useFetch from "../../hooks/useFetch";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

function Recipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "recipes", id);
    setLoading(true);
    setError(null);
    setRecipe(null);
    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        setLoading(false);
        setError(null);
        setRecipe(snapshot.data());
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const handleClick = (id) => {
    const docRef = doc(db, "recipes", id);
    updateDoc(docRef, {
      title: "Something different",
    });
  };

  return (
    <>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <div className="recipe">
          <h2>{recipe.title}</h2>
          <p>{recipe.cookingTime} to cook</p>
          <br />
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={() => handleClick(id)}>Edit</button> */}
        </div>
      )}
    </>
  );
}

export default Recipe;

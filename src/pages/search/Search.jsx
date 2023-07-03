import "./Search.css";

import React from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

function Search() {
  const [params] = useSearchParams();
  var term = "";
  for (const entry of params.entries()) {
    const [key, val] = entry;
    term = val;
  }
  var li = "http://localhost:3000/recipes?q=" + term;
  const { data: recipes, loading, error } = useFetch(li);

  return (
    <>
      <h2 className="page-title">Recipes including "{term}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </>
  );
}

export default Search;

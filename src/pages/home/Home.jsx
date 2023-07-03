import React, { useEffect, useState } from "react";
import "./Home.css";
import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function Home() {
  // const { data, loading, error } = useFetch("http://localhost:3000/recipes");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const colRef = collection(db, "recipes");

    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        setLoading(true);
        setError(null);
        setData(null);
        if (snapshot.empty) {
          setError("Nothing to load");
          setLoading(false);
        } else {
          let recipes = [];
          snapshot.docs.forEach((doc) => {
            recipes.push({ ...doc.data(), id: doc.id });
          });
          setData(recipes);
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">LOADING...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;

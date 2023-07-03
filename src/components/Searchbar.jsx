import "./Searchbar.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term == "") {
      navigate("/");
    }
    const li = "/search?q=" + term;
    navigate(li);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default Searchbar;

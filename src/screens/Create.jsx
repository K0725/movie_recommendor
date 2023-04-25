import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const searchUrl = "https://api.themoviedb.org/3/search/movie";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function Create() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(searchUrl, {
        params: {
          api_key: API_KEY,
          query: search,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.log("Error searching for movie:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedMovie) {
      alert("Please select a movie");
      return;
    }
  
    try {
      const { data, error } = await supabase.from("Posts").insert([
        {
          title: selectedMovie.title,
          rating: rating,
          comments: comment,
          time: new Date().toISOString(),
        },
      ]);
  
      if (error) {
        console.log("Error response from Supabase:", error);
        throw error;
      }
  
      navigate('/');
    } catch (error) {
      console.log("Error creating post:", error.message);
    }
  };
  

  return (
    <div>
      <h3>Select the Movie and Let's create a post!</h3>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          >
            {movie.title}
          </button>
        ))}
      </div>
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
          <form onSubmit={handleSubmit}>
            <label>
              Rating:
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </label>
            <button type="submit">Submit</button>
            </form>
          </div>
        )}
        </div>
);
}

export default Create;

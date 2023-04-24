import { useState } from "react";
import { supabase } from "../client";
import axios from "axios";
// ANOTHER PAVE 
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const searchUrl = "https://api.themoviedb.org/3/search/movie";

function Create() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");

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
      await supabase.from("posts").insert([
        {
          title: selectedMovie.title,
          image: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
          rating: rating,
          comment: comment,
        },
      ]);
      alert("Post created successfully!");
    } catch (error) {
      console.log("Error creating post:", error.message);
    }
  };

  return (
    <div>
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

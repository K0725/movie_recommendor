import { useState, useEffect } from 'react'; // Add useEffect here
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { supabase } from '../client';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

function Home() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(genresUrl, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault();

    axios
      .get(searchUrl, {
        params: {
          api_key: API_KEY,
          query: search,
        },
      })
      .then((response) => {
        const resultsWithGenres = response.data.results.map((movie) => {
          const movieGenres = movie.genre_ids.map((id) =>
            genres.find((genre) => genre.id === id)
          );
          return { ...movie, genres: movieGenres };
        });
        setResult(resultsWithGenres);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearchQueryChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="Head">
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleSearchQueryChange}
          />
          <button type="submit">Search</button>
        </form>
        {result.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            description={movie.overview}
            genres={movie.genres.map((genre) => genre.name).join(', ')}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

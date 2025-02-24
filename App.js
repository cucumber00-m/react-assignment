
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('guardians');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://dummyapi.online/api/movies');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.Response === 'False') throw new Error(data.Error);
        
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  if (isLoading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="movies">
      <h1>Movie Database</h1>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
        />
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <div className="movie-poster">
              {movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} alt={movie.Title} />
              ) : (
                <div className="poster-placeholder">No Image Available</div>
              )}
            </div>
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <div className="movie-details">
                <p>Year: {movie.Year}</p>
                <p>Type: {movie.Type}</p>
                <p>IMDB ID: {movie.imdbID}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
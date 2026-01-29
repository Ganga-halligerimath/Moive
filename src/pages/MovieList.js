import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/authContext";
import { useCallback } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch movies from backend
  const fetchMovies = useCallback(async () => {
    console.log("FETCHING MOVIES");
    setLoading(true);
    try {
      const res = await api.get(`/movies?by=${sortBy}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <p>Loading movies...</p>;
  if (movies.length === 0) return <p>No movies available</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movies List</h2>


      {/* Movie Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* {sortedMovies.map((movie) => (
           */}
        {movies.map((movie) => (

          <div
            key={movie._id}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h4 style={{ margin: "10px 0 5px" }}>
              {movie.title} {movie.isFavorite && "⭐"}
            </h4>
            <p>Rating: {movie.imdbRating}</p>
            <p>Release: {movie.released}</p>

            {user?.role === "admin" && (
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => navigate(`/admin/edit/${movie._id}`)}>✏️ Edit</button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={async () => {
                    if (!window.confirm("Delete this movie?")) return;

                    try {
                      await api.delete(`/movies/${movie._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      });

                      // 🔥 FORCE reload movies from backend
                      setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
                    } catch (err) {
                      console.error("Delete failed", err);
                    }
                  }}
                >
                  🗑 Delete
                </button>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


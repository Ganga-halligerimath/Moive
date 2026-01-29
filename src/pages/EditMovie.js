import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import api from "../api/axios";
import { AuthContext } from "../auth/authContext";

export default function EditMovie() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    released: "",
    runtime: "",
    genre: "",
    director: "",
    actors: "",
    rating: "",
    poster: null,
  });

  const [loading, setLoading] = useState(true);

  // ✅ fetchMovie wrapped in useCallback
  const fetchMovie = useCallback(async () => {
    try {
      const res = await api.get(`/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;

      setMovie({
        title: data.title || "",
        description: data.description || "",
        released: data.released ? data.released.split("T")[0] : "",
        runtime: data.runtime || "",
        genre: data.genre || "",
        director: data.director || "",
        actors: data.actors || "",
        rating: data.rating || "",
        poster: null,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [id, token]);

  // ✅ useEffect calls fetchMovie after it's defined
  useEffect(() => {
    if (id) fetchMovie();
  }, [id, fetchMovie]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setMovie({ ...movie, poster: e.target.files[0] });
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(movie).forEach((key) => {
        if (movie[key] !== null) formData.append(key, movie[key]);
      });

      await api.put(`/movies/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      navigate("/movies");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading movie...</p>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Edit Movie (Admin)
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField label="Title" name="title" value={movie.title} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Description" name="description" value={movie.description} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Released" name="released" type="date" value={movie.released} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Runtime" name="runtime" value={movie.runtime} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Genre" name="genre" value={movie.genre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Director" name="director" value={movie.director} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Actors" name="actors" value={movie.actors} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Rating" name="rating" value={movie.rating} onChange={handleChange} fullWidth margin="normal" />

        <input type="file" name="poster" accept="image/*" onChange={handleChange} style={{ marginTop: "16px" }} />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Update Movie
        </Button>
      </form>
    </Box>
  );
}

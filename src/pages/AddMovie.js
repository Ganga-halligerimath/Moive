import { useState, useContext } from "react";
import { AuthContext } from "../auth/authContext";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {


  const [movie, setMovie] = useState({
    title: "",
    description: "",
    released: Date,
    runtime: "",
    genre: "",
    director: "",
    actors: "",
    poster: null, // ✅ image file
  });

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  // alert (token);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setMovie({ ...movie, poster: files[0] });
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if admin
    if (!user || user.role !== "admin") {
      alert("Access denied: Admins only 🚫");
      return;
    }
    try {
      ;
      const formData = new FormData();

      Object.keys(movie).forEach((key) => {
        formData.append(key, movie[key]);
      });
      // alert(formData.get("title"));
      await api.post("/admin/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
          // "Content-Type": "multipart/form-data", // ✅ important for file uploads
        },
      });

      alert("Movie added successfully ✅");
      navigate("/movies"); // ✅ redirect after success
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Error adding movie");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Add New Movie (Admin)
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Released"
          name="released"
          type="date"
          value={movie.released}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }} // 🔥 THIS fixes overlap
        />


        <TextField
          label="Runtime"
          name="runtime"
          value={movie.runtime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Genre"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Director"
          name="director"
          value={movie.director}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Actors"
          name="actors"
          value={movie.actors}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleChange}
          style={{ marginTop: "16px" }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Movie
        </Button>
      </form>
    </Box>
  );
}

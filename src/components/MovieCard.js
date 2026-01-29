import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import api from "../api/axios";

export default function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

const handleDelete = async () => {
  if (!window.confirm("Delete this movie?")) return;

  try {
    await api.delete(`/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // remove movie from UI
    if (typeof onDelete === "function") onDelete(movie._id);
  } catch (err) {
    console.error("Failed to delete movie:", err);
    alert("Error deleting movie");
  }
};

  return (
    <Card sx={{ maxWidth: 250, m: 1 }}>
      <CardMedia
        component="img"
        height="350"
        image={movie.poster}
        alt={movie.title}
      />

      <CardContent>
        {/* TITLE + ACTIONS */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          
        >
          <Typography variant="h6" component="div">
            {movie.title}
            <StarIcon sx={{ color: "gold", fontSize: 18, ml: 0.5 }} />
          </Typography>

          {/* ADMIN ACTIONS */}
          {user?.role === "admin" && (
            <Box>
              <IconButton
                size="small"
                onClick={() => navigate(`/admin/edit/${movie._id}`)}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                onClick={handleDelete}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Rating: {movie.imdbRating || "N/A"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Release: {movie.released || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}

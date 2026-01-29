// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import MovieCard from "../components/MovieCard";
// import { Grid, TextField, Box, Pagination } from "@mui/material";

// export default function Movies({ searchQuery = "" }) {
//   const [movies, setMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const moviesPerPage = 8;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const res = await api.get("/movies");
//       setMovies(res.data);
//     };
//     fetchMovies();
//   }, []);

// const filtered = movies.filter((m) =>
//   m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   m.description?.toLowerCase().includes(searchQuery.toLowerCase())
// );
//   const handlePageChange = (e, value) => setPage(value);

//   const paginated = filtered.slice(
//     (page - 1) * moviesPerPage,
//     page * moviesPerPage
//   );

//   return (


//     <Box sx={{ p: 3 }}>
//       {/* <TextField
//         label="Search movies..."
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 3 }}
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       /> */}
//       <Grid container spacing={2}>
//         {paginated.map((movie) => (
//           <Grid item key={movie._id}>
//             <MovieCard movie={movie} />
//           </Grid>
//         ))}
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//         <Pagination
//           count={Math.ceil(filtered.length / moviesPerPage)}
//           page={page}
//           onChange={handlePageChange}
//         />
//       </Box>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";
import { Grid, Box, Pagination } from "@mui/material";

export default function Movies({ searchQuery = "" }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("titleAsc");

  const moviesPerPage = 8;

  console.log(movies.map(m => m.title));

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
    // fetchMovies(e.target.value);
  };

  const fetchMovies = async (sortBy) => {
      const res = await api.get(`/movies/sorted?by=${sortBy}`);

      setMovies(res.data);
    };
  // 🔹 Fetch movies whenever sort changes
  useEffect(() => {
    fetchMovies(sortBy);
  }, [sortBy]);



  const filtered = movies.filter(
    (m) =>
      m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Pagination
  const handlePageChange = (e, value) => setPage(value);


  const paginated = filtered.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  

  return (
    <Box sx={{ p: 3 }}>

      <Box sx={{ mb: 2 }}>
        <label>
          Sort by{" "}
          <select value={sortBy} onChange={handleSortChange}>
            {/* <option>Select option</option> */}
            <option value="titleAsc">Title ↑</option>
            <option value="titleDesc">Title ↓</option>
            <option value="releasedAsc">Release Date ↑</option>
            <option value="releasedDesc">Release Date ↓</option>
            <option value="imdbRatingAsc">Rating (Low to High)</option>
            <option value="imdbRatingDesc">Rating (High to Low)</option>
          </select>
        </label>
      </Box>

      {/* 🎬 MOVIES GRID */}
      <Grid container spacing={2}>
        {paginated.map((movie) => (
          // <Grid item key={movie._id}>
          //   <MovieCard movie={movie} />
          // </Grid>
          <Grid item>
            <MovieCard key={movie._id} movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* 📄 PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filtered.length / moviesPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

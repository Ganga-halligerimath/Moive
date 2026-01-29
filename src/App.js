import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movie";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import AdminRoute from "./components/AdminRoute";

function App() {
  const [setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");       // NEW

  return (
    <AuthProvider>
      <Router>
        {/* NEW Navbar with sorting */}
        <Navbar
          onSearch={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/movies"
            element={
              <Movies
                
              />
            }
          />

          {/* ADMIN ONLY */}
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddMovie />
              </AdminRoute>
            }
          />

          <Route path="/admin/edit/:id" element={<EditMovie />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

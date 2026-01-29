// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
// import api from "../api/axios";
// import { AuthContext } from "../auth/authContext.js";
// import "./Login.css";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // ✅ hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       login(res.data.token);
//       navigate("/movies"); // ✅ redirect to movies page
//     } catch (err) {
//       alert("Login failed. Check your credentials.");
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button>Login</button>
//     </form>
//   );
// }



import { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/authContext.js";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [setToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem("token",  JSON.stringify(res.data.token));

      // ✅ STORE FULL USER INFO
      // setToken(res.data.token);

      // ✅ ALSO STORE IN CONTEXT (OPTIONAL)
      login(res.data.token);
      navigate("/movies");
    } catch (err) {
      // alert("Login failed. Check your credentials.");
      alert(err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      
       {/* ✅ Register link */}
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
          Register
        </Link>
      </p>
    </form>
  );
}

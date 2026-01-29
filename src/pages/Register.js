        import { useState } from "react";
        import { useNavigate,Link } from "react-router-dom";
        import api from "../api/axios";
        import "./Login.css";

        export default function Register() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleRegister = async (e) => {
            e.preventDefault();
            if (!name || !email || !password) return alert("All fields are required");

            try {
            const res = await api.post("/auth/register", { name, email, password });

            // Save user info and token
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            alert("Registration successful!");
            navigate("/login");
            } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
            }
        };

        return (
            <form className="login-form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Register</button>
             <p style={{ marginTop: "10px" }}>
            Already have an account?
        <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
          Login
        </Link>
      </p>
            </form>
        );
        }

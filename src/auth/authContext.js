// import { createContext, useState, useMemo } from "react";
// // import { jwtDecode } from "jwt-decode";
// import {jwtDecode} from "jwt-decode";


// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => {
//     return localStorage.getItem("token");
//   });

  

//   const login = (jwtToken) => {
//     console.log("LOGIN TOKEN 👉", jwtToken);
//     console.log("LOGIN TOKEN TYPE 👉", typeof jwtToken);
//     console.log("LOGIN TOKEN 👉", jwtToken);
//     localStorage.setItem("token", jwtToken);
//     setToken(jwtToken);
//   };

//   const logout = () => {
//     console.log("LOGOUT CLICKED");
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const user = useMemo(() => {
//     if (!token) return null;
//     try {
//       return jwtDecode(token);
//     } catch (e) {
//       console.error("JWT ERROR", e);
//       return null;
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// authContext.js
import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // ✅ default import, not named

// 1️⃣ Create the context
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Decode token whenever it changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // decoded usually has {id, email, role, exp...}
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

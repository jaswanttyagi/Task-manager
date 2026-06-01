import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  const [page, setPage] = useState(savedToken ? "dashboard" : "login");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [token, setToken] = useState(savedToken || "");

  const handleLogin = (loggedInUser, authToken) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("token", authToken);
    setUser(loggedInUser);
    setToken(authToken);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setPage("login");
  };

  if (page === "signup") {
    return <Signup goToLogin={() => setPage("login")} />;
  }

  if (page === "dashboard") {
    return <Dashboard user={user} token={token} onLogout={handleLogout} />;
  }

  return (
    <Login
      onLogin={handleLogin}
      goToSignup={() => setPage("signup")}
    />
  );
}

export default App;

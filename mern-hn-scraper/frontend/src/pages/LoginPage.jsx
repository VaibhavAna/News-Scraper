import {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContextValue";

import "../styles/auth.css";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      login(res.data);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(error?.response?.data?.message || "Invalid credentials");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-shell">
      <section className="auth-panel">
        <div className="auth-brand">JWT Auth System</div>
        <h1>Secure access for your Hacker News workspace.</h1>
        <p>
          Sign in to manage saved stories with token-based authentication,
          protected routes, and persistent sessions.
        </p>

        <div className="auth-highlights">
          <div className="auth-highlight">
            <strong>JWT</strong>
            <span>Signed 7-day sessions</span>
          </div>
          <div className="auth-highlight">
            <strong>MongoDB</strong>
            <span>Saved user bookmarks</span>
          </div>
          <div className="auth-highlight">
            <strong>API</strong>
            <span>Protected Express routes</span>
          </div>
        </div>
      </section>

      <main className="auth-card-wrap">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p>Enter your credentials to continue.</p>
        <form onSubmit={handleSubmit}>

          <div className="auth-field">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="auth-field">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >

            {loading
              ? "Signing in..."
              : "Login"}

          </button>

        </form>

        <div className="auth-switch">

          <p>
            Don't have an account?{" "}

            <Link
              to="/register"
            >
              Register
            </Link>

          </p>

        </div>

        </div>
      </main>

    </div>
  );
}

export default LoginPage; 

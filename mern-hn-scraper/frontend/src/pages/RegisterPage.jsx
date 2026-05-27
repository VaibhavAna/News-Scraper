//RegisterPage
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

function RegisterPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      login(res.data);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(error?.response?.data?.message || "Registration failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-shell">
      <section className="auth-panel">
        <div className="auth-brand">JWT Auth System</div>
        <h1>Create a protected account in seconds.</h1>
        <p>
          Register once, receive a signed token, and start saving your Hacker
          News stories behind secure API routes.
        </p>

        <div className="auth-highlights">
          <div className="auth-highlight">
            <strong>Hashing</strong>
            <span>Passwords stored safely</span>
          </div>
          <div className="auth-highlight">
            <strong>Tokens</strong>
            <span>Bearer auth for requests</span>
          </div>
          <div className="auth-highlight">
            <strong>Routes</strong>
            <span>Private bookmark access</span>
          </div>
        </div>
      </section>

      <main className="auth-card-wrap">
        <div className="auth-card">
          <h2>Create account</h2>
          <p>Use a valid email and a password with at least 6 characters.</p>

        <form onSubmit={handleSubmit}>

          <div className="auth-field">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

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
              minLength="6"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        <div className="auth-switch">

          <p>
            Already have an account?{" "}

            <Link
              to="/login"
            >
              Login
            </Link>

          </p>

        </div>

        </div>
      </main>

    </div>
  );
}

export default RegisterPage;

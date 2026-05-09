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

      alert("Registration failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e3a8a)",
        fontFamily: "Arial",
      }}
    >

      {/* 3D BLUE REGISTER CARD */}
      <div
        style={{
          width: "300px",
          background: "linear-gradient(145deg, #ffffff, #f1f5f9)",
          padding: "28px",
          borderRadius: "18px",
          boxShadow:
            "10px 10px 20px rgba(0,0,0,0.25), -6px -6px 15px rgba(255,255,255,0.1)",
          transform: "perspective(800px) rotateX(2deg)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "22px",
          }}
        >

          <h1
            style={{
              margin: "0",
              color: "#1e3a8a",
              fontSize: "22px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "13px",
              marginTop: "6px",
            }}
          >
            Register to get started
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "15px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                outline: "none",
                background: "#f8fafc",
              }}
            />

          </div>

          <div style={{ marginBottom: "15px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                outline: "none",
                background: "#f8fafc",
              }}
            />

          </div>

          <div style={{ marginBottom: "20px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                outline: "none",
                background: "#f8fafc",
              }}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #1e3a8a, #2563eb)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                "0 6px 14px rgba(37,99,235,0.3)",
            }}
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
          }}
        >

          <p
            style={{
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;

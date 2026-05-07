import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function RegisterPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      login(res.data);

      navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default RegisterPage;
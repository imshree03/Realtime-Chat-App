import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should have more than 8 characters", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should have more than 3 characters", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Login User</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

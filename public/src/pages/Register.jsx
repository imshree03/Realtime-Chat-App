import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

function Register() {
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
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // alert(JSON.stringify(values));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(values);
    if (handleValidation()) {
      const { email, password, username } = values;
      console.log(values);
      const { data } = await axios.post(registerRoute, {
        email,
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    // console.log(username);
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should have more than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
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
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;

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
    padding: 3rem 5rem;
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

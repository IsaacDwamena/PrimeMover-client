import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../assets/icons/Username.svg";
import Password from "../../assets/icons/Password.svg";
import Error from "../../assets/icons/Error.svg";
import { useState, useEffect } from "react";
import axios from "axios";

export const Login = () => {
  const [userEmailLogin, setUserEmailLogin] = useState("");
  const [userPasswordLogin, setUserPasswordLogin] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/manager");
    }
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (!userEmailLogin) {
      setEmailError(true);
      return;
    }

    if (!userPasswordLogin) {
      setPasswordError(true);
      return;
    }

    const login = async () => {
      try {
        const { data } = await axios.post(`${SERVER_URL}/users/login`, {
          email: userEmailLogin,
          password: userPasswordLogin,
        });

        sessionStorage.setItem("token", data.token);
        navigate("/manager");
      } catch (error) {
        console.log(error);
      }
    };

    login();
  };

  return (
    <div className="login" onSubmit={onFormSubmit}>
      <div className="login__detail">
        <h1 className="login__header">Welcome!</h1>
        <form className="login__form">
          <div className={!emailError ? "login__block-container" : "error"}>
            <img
              src={Profile}
              alt="user profile icon"
              className="login__user-icon"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login__email input"
              onChange={(event) => setUserEmailLogin(event.target.value)}
            />
          </div>
          {emailError && (
            <p className="login__error-text">
              <img className="login__error-icon" src={Error} alt="error icon" />
              Please provide the correct email.
            </p>
          )}
          <div className={!passwordError ? "login__block-container" : "error"}>
            <img
              src={Password}
              alt="password icon"
              className="login__user-icon"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="login__passwod input"
              onChange={(event) => setUserPasswordLogin(event.target.value)}
            />
          </div>
          {passwordError && (
            <p className="login__error-text">
              <img className="login__error-icon" src={Error} alt="error icon" />
              Please provide the correct password.
            </p>
          )}
          <button type="submit" className="login__login-cta">
            Log In
          </button>
        </form>
        <p className="login__text">or</p>
        <div className="login__signup-cta">
          Don't have an account?{" "}
          <Link to="/sign-up" className="login__link">
            Create now
          </Link>
        </div>
      </div>
    </div>
  );
};

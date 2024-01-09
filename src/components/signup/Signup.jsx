import "../login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../assets/icons/Username.svg";
import Password from "../../assets/icons/Password.svg";
import Error from "../../assets/icons/Error.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";

export const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/manager");
    }
  });

  const validEmail = validator.isEmail(userEmail);

  const onFormSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (!validEmail) {
      setEmailError(true);
      return;
    }

    if (!userPassword) {
      setPasswordError(true);
      return;
    }

    const signup = async () => {
      try {
        const { data } = await axios.post(`${SERVER_URL}/users/register`, {
          email: userEmail,
          password: userPassword,
        });

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };

    signup();
  };

  return (
    <>
      <Link to="/" className="login__logo">
        Prime<span className="high">Movers</span>
      </Link>
      <div className="login">
        <div className="login__detail">
          <h1 className="login__header">Welcome!</h1>
          <form className="login__form" onSubmit={onFormSubmit} noValidate>
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
                className="llogin__email auth-input"
                onChange={(event) => setUserEmail(event.target.value)}
              />
            </div>
            {emailError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a valid email.
              </p>
            )}
            <div
              className={!passwordError ? "login__block-container" : "error"}
            >
              <img
                src={Password}
                alt="password icon"
                className="login__user-icon"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login__passwod auth-input"
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </div>
            {passwordError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a valid password.
              </p>
            )}
            <button type="submit" className="login__login-cta">
              Sign Up
            </button>
          </form>
          <p className="login__text">or</p>
          <div className="login__signup-cta">
            Already have an account?{" "}
            <Link to="/login" className="login__link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

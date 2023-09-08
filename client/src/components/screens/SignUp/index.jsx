import { useState, useEffect } from "react";
import axios from "../../../axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmpassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={registerHandler}>
        <h1 className={styles.heading}>Sign up Form</h1>
        {error && <span>{error}</span>}
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img
              className={styles.img}
              src="./images/signup.jpg"
              alt="signup"
            />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Create Account</h2>
            <input
              className={styles.input}
              type="text"
              required
              id="name"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              tabIndex={1}
            />
            <input
              className={styles.input}
              type="text"
              required
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={2}
            />
            <input
              className={styles.input}
              type="password"
              required
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={3}
            />
            <input
              className={styles.input}
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              tabIndex={4}
            />
            <button className={styles.btn} type="submit" tabIndex={5}>
              Sign Up
            </button>
            <p className={styles.text}>
              Already Have Account ?{" "}
              <Link to="/login" tabIndex={6}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

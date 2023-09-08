import { useState, React, useEffect } from "react";
import axios from "../../../axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={loginHandler}>
        <h1 className={styles.heading}>Log in Form</h1>
        {error && <span>{error}</span>}

        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/login.jpg" alt="login" />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Members Log in</h2>

            <input
              className={styles.input}
              type="email"
              required
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
            <input
              className={styles.input}
              type="password"
              required
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
            <button className={styles.btn} type="submit" tabIndex={3}>
              Log In
            </button>
            <p className={styles.text}>
              Forgot Password ?{" "}
              <Link to="/forgotpassword" tabIndex={4}>
                Reset Password
              </Link>
            </p>
            <p className={styles.text}>
              New Here ?{" "}
              <Link to="/register" tabIndex={5}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

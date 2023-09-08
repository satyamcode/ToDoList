import { useState, React } from "react";
import axios from "../../../axios";
import styles from "./styles.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={forgotPasswordHandler}>
        <h1 className={styles.heading}>Forgot Password</h1>

        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/login.jpg" alt="login" />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Member's Email</h2>
            {error && <span>{error}</span>}
            {success && <span>{success}</span>}
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
            <button className={styles.btn} type="submit" tabIndex={3}>
              Send Reset Password Link
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

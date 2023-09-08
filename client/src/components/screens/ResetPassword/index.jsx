import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import styles from "./styles.module.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const params = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${params.resetToken}`,
        { password },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={resetPasswordHandler}>
        <h1 className={styles.heading}>Reset Password Form</h1>

        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/login.jpg" alt="signup" />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Reset Password</h2>
            {error && <span>{error}</span>}
            {success && (
              <span>
                {success}
                <Link to="/login">Login</Link>
              </span>
            )}
            <input
              className={styles.input}
              type="password"
              required
              id="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={1}
            />
            <input
              className={styles.input}
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              tabIndex={2}
            />
            <button className={styles.btn} type="submit" tabIndex={3}>
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;

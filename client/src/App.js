import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import ForgotPassword from "./components/screens/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword";

import PrivateScreen from "./components/screens/PrivateScreen";
// import LoginScreen from "./components/screens/LoginScreen";
// import RegisterScreen from "./components/screens/RegisterScreen";
// import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
// import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <PrivateScreen />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

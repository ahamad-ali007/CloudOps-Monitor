import { useState } from "react";
import EC2 from "./pages/EC2";
import CloudWatch from "./pages/CloudWatch";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import { isAuthenticated, logout } from "./services/authService";

function App() {
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated()
  );

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  // ----------------------------------------------------------
  // Authentication gate
  // ----------------------------------------------------------

  if (!authenticated) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // ----------------------------------------------------------
  // Authenticated application
  // ----------------------------------------------------------

  return (
    <BrowserRouter>
      <Routes>
          <Route
              path="/ec2"
              element={
               <EC2 />
          }
           />
          <Route
  path="/cloudwatch"
  element={
    <CloudWatch />

  }
/>


        <Route
  path="/alerts"
  element={<Alerts />}
/>

<Route
  path="/reports"
  element={<Reports />}
/>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              onLogout={handleLogout}
            />
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        <Route
  path="/settings"
  element={<Settings />}
/>

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

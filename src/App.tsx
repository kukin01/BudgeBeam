import * as React from 'react'
import LoginPage from "./pages/auth/login";
import AuthLayout from './layout/authLayout';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


// PrivateRoute component for protecting routes
const PrivateRoute: React.FC<{ children: React.ReactElement; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }
  const userRoles = JSON.parse(user).roles;
  const isAuthorized = allowedRoles.some(role => userRoles.includes(role));
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
        path='/auth/*'
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }>
          <Route path='login' element={<LoginPage/>} />
        </Route>
        {/* Add your login route here if not already present */}
      </Routes>
    </Router>
  ) 
}

export default App

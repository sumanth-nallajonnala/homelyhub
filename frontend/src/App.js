import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyDetails from './pages/PropertyDetails';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import CreateProperty from './pages/CreateProperty';
import MyProperties from './pages/MyProperties';

// Component to redirect authenticated users from landing
const LandingRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return <Landing />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Landing Page - Only for non-authenticated users */}
          <Route path="/" element={<LandingRedirect />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Protected Routes - Require Login */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Require Host Role */}
          <Route
            path="/create-property"
            element={
              <ProtectedRoute requireHost={true}>
                <CreateProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-properties"
            element={
              <ProtectedRoute requireHost={true}>
                <MyProperties />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}

export default App;
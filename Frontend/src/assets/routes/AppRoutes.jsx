import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import '../../styles/theme.css'
import Home from '../general/Home'
import Profile from '../pages/Food-partner/Profile'
import CreateFood from '../pages/Food-partner/CreateFood'
import VideoPage from '../general/VideoPage';
import SavePage from '../general/SavePage';

function RequireFoodPartner({ children }) {
  const { auth } = useAuth();
  if (!auth || auth.type !== 'foodPartner') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/register" element={<Navigate to="/user/register" />} />
        <Route path="/login" element={<Navigate to="/user/login" />} />
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/saved" element={<SavePage />} />
        <Route
          path="/create-food"
          element={
            <RequireFoodPartner>
              <CreateFood />
            </RequireFoodPartner>
          }
        />
        <Route path='/food-partner/:id' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes

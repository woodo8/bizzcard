import React, { useEffect, useState, } from 'react'
import './App.css';
// @ts-ignore
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Homepage from './pages/homepage/homepage';
import Signin from './pages/signIn/signin';
import Signup from './pages/signup/signup';
import RPassword from './pages/recreatePassword/rPassword';
import SubscriptionPrem from './pages/subscriptionPremium/subscriptionPrem';
import SubscriptionFree from './pages/subscriptionFree/subscriptionFree';
import MyProfile from './pages/myProfile/myProfile';
import EditProfile from './pages/editProfile/editProfile';
import Loader from './components/loader/loader';
function App() {

  let location = useLocation()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [location.pathname])



  return (
    // <BrowserRouter>
    <div className="App">
      <Loader className={loading ? "active" : "disap"} />
      {!loading && <Routes>
        <Route
          path="/"
          element={<Homepage />} />
        <Route
          path="/signup"
          element={<Signup />} />
        <Route
          path="/signin"
          element={<Signin />} />
        <Route
          path="/forgotpassword"
          element={<RPassword />} />
        <Route
          path="/subscribe_premium"
          element={<SubscriptionPrem />} />
        <Route
          path="/subscribe_free"
          element={<SubscriptionFree />} />
        <Route
          path="/profile"
          element={<MyProfile />} />
        <Route
          path="/edit_profile"
          element={<EditProfile />} />
      </Routes>}
    </div>
    // </BrowserRouter>
  );
}

export default App;

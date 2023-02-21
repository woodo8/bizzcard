import React, { useState } from 'react'
import './App.css';
// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from './pages/homepage/homepage';
import Signin from './pages/signIn/signin';
import Signup from './pages/signup/signup';
import RPassword from './pages/recreatePassword/rPassword';
import SubscriptionPrem from './pages/subscriptionPremium/subscriptionPrem';
import SubscriptionFree from './pages/subscriptionFree/subscriptionFree';
import MyProfile from './pages/myProfile/myProfile';
function App() {
  const [first, setfirst] = useState("hello")
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Homepage/>} />
          <Route
            path="/signup"
            element={<Signup/>} />
          <Route
            path="/signin"
            element={<Signin/>} />
          <Route
            path="/forgotpassword"
            element={<RPassword/>} />
          <Route
            path="/subscribe_premium"
            element={<SubscriptionPrem/>} />
          <Route
            path="/subscribe_free"
            element={<SubscriptionFree/>} />
          <Route
            path="/profile"
            element={<MyProfile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

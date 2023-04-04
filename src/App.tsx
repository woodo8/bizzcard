import React, { useEffect, useState, } from 'react'
import './App.css';
// @ts-ignore
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Homepage from './pages/homepage/homepage';
import Signin from './pages/signIn/signin';
import Signup from './pages/signup/signup';
import RPassword from './pages/forgotPassword/forgotPassword';
import SubscriptionPrem from './pages/subscriptionPremium/subscriptionPrem';
import SubscriptionFree from './pages/subscriptionFree/subscriptionFree';
import Loader from './components/loader/loader';
import LoginSuccess from './pages/loginSuccess/loginSuccess';
import { useGetUserQuery } from './services/authApi';
import { StateContext } from './context/useContext';
import { tokenMiddleware } from './services/tokenMiddleware';
import ProtectedRoutes from './routes/protectedRoutes';
import Profile from './pages/viewNEditProfile/profile';
import BizzCard from './pages/bizzcard/bizzCard';
import EditProfile from './pages/editCard/editProfile';
import NewPassword from './pages/newPassword/newPassword';

function App() {

  let location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [location.pathname])

  // if user is signed in, check whether his/her token is not expired


  const [globalUser, setGlobalUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const token = localStorage.getItem('token')


  // get the user info in order to check the validity of the token  
  const { data, error, isLoading, isSuccess, isError } = useGetUserQuery({ token, id: globalUser.id });


  useEffect(() => {
    // check if the error is returned
    if (isError) {
      if ('status' in error && 'data' in error) {
        token && tokenMiddleware(error.status, error.data)
      }
    }
    if (isSuccess) {
      setGlobalUser(data)
    }
  }, [isLoading])

  return (

    <StateContext.Provider value={{
      globalUser: Object.keys(globalUser).length !== 0 ? globalUser : "",
      setGlobalUser
    }}>
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
            path="/new_password/:token"
            element={<NewPassword />} />
          <Route
            path="/subscribe_premium"
            element={<SubscriptionPrem />} />
          <Route
            path="/subscribe_free"
            element={<SubscriptionFree />} />
          <Route
            path="/bizz_card"
            element={<BizzCard />} />
          <Route
            path="/edit_profile"
            element={<EditProfile />} />
          <Route
            path="/login_success"
            element={<LoginSuccess />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/profile"
              element={<Profile />} />
          </Route>
        </Routes>}
      </div>
    </StateContext.Provider>

  );
}

export default App;

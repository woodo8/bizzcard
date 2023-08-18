import React, { useEffect, useState, } from 'react'
import './App.css';
// @ts-ignore
import { Routes, Route, useLocation } from "react-router-dom"
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
import NewPassword from './pages/newPassword/newPassword';
import OrderSuccess from './pages/orderSuccess/orderSuccess';
import MyCards from './pages/myCards/myCards';
import EditCard from './pages/editCard/editCard';
import CreateNewCard from './pages/createNewCard/createNewCard';
import ScrollToTop from 'react-scroll-up'
// @ts-ignore
import { AnimatePresence, } from 'framer-motion/dist/framer-motion'
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
function App() {

  const [loading, setLoading] = useState<boolean>(false)
  const location = useLocation();
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

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



  i18n.use(LanguageDetector).init({
    resources: {
      en: {
        translation: require('./locales/en.json')
      },
      ru: {
        translation: require('./locales/ru.json')
      },
      uz: {
        translation: require('./locales/uz.json')
      }
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

  return (
    <I18nextProvider i18n={i18n}>

      <StateContext.Provider value={{
        globalUser: Object.keys(globalUser).length !== 0 ? globalUser : "",
        setGlobalUser
      }}>
        <div className="App">
          <Loader className={loading ? "active" : "disap"} />
          {
            !loading &&
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
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
                  path="/bizz_card/:id"
                  element={<BizzCard />} />
                <Route
                  path="/edit_card"
                  element={<EditCard />} />
                <Route
                  path="/login_success"
                  element={<LoginSuccess />} />
                <Route
                  path="/order_success"
                  element={<OrderSuccess />} />
                <Route element={<ProtectedRoutes />}>
                  <Route
                    path="/profile"
                    element={<Profile />} />
                  <Route
                    path="/my_cards/"
                    element={<MyCards />} />
                  <Route
                    // path="/create_card/:value/:contactsValue"
                    path="/create_card/"
                    element={<CreateNewCard />} />
                </Route>
              </Routes>
              {/* <AppRoutes location={location} key={location.pathname} /> */}
              {/* <PageTransition /> */}
            </AnimatePresence>
          }
          <ScrollToTop easing='easeOutQuint' duration={1000} showUnder={160}>
            <span className='upButton'>UP</span>
          </ScrollToTop>
        </div>
      </StateContext.Provider>
    </I18nextProvider>

  );
}

export default App;

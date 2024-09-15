import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../redux/auth';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RegisterRoute from './RegisterRoute';
import Loader from './Loader';
import NotFoundPage from '../pages/NotFoundPage';
import './App.module.scss'; 

const MainPage = lazy(() => import('../pages/MainPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage'));
const DiaryPageView = lazy(() => import('../pages/DiaryPage'));

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  if (isFetchingCurrentUser) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            isLoggedIn ? (
              <Navigate to="/diary" replace />
            ) : (
              <MainPage />
            )
          }
        />
        <Route
          path="register"
          element={
            <RegisterRoute redirectTo="/login" restricted>
              <RegisterPage />
            </RegisterRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute redirectTo="/" restricted>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="calculator"
          element={
            <PrivateRoute redirectTo="/login">
              <CalculatorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="diary"
          element={
            <PrivateRoute redirectTo="/login">
              <DiaryPageView />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

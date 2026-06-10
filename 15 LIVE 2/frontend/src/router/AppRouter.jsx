import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import AdminPage from '../pages/AdminPage/AdminPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const fakeAuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout user={fakeAuthState.user} token={fakeAuthState.token} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/admin',
        element: (
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

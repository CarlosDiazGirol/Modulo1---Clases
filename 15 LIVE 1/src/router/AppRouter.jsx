import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

function AppRouter() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Layout user={user} cartCount={cartCount} />,
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
              element: <HomePage cartCount={cartCount} setCartCount={setCartCount} />,
            },
            {
              path: '/login',
              element: <LoginPage setUser={setUser} />,
            },
          ],
        },
      ]),
    [user, cartCount],
  );

  return <RouterProvider router={router} />;
}

export default AppRouter;

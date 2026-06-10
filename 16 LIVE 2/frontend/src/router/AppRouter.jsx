import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CartPage from '../pages/CartPage/CartPage';
import CheckoutSuccessPage from '../pages/CheckoutSuccessPage/CheckoutSuccessPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/checkout/success',
        element: <CheckoutSuccessPage />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

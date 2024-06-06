import { createBrowserRouter } from "react-router-dom";
import Products from "../page/Products";
import App from "../App";
import Orders from "../page/Orders";
import NotFound from "../page/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

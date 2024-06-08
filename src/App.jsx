import Navigation from "./components/ui/Navigation";

import { Outlet } from "react-router-dom";
import Products from "./page/Products";
import Orders from "./page/Orders";

function App() {
  return (
    <div className="">
      <Navigation title="Product" />
      <Products />
      <Navigation title="Order" />
      <Orders />
      {/* <Outlet /> */}
    </div>
  );
}

export default App;

import { useEffect } from "react";
import Button from "./components/ui/Button";
import CustomSearchBar from "./components/ui/CustomSearchBar";
import Navigation from "./components/ui/Navigation";
import { useGetProductsQuery } from "./redux/api/apiSlice";

import dataJson from "./utils/data.json";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    // console.log("ddd", dataJson);
  }, []);

  const { data, isLoading, error } = useGetProductsQuery();
  // console.log("dddd", data, error, isLoading);
  return (
    <div className="">
      <Navigation />

      <Outlet />
    </div>
  );
}

export default App;

import { useEffect } from "react";
import Navigation from "./components/ui/Navigation";

import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    // console.log("ddd", dataJson);
  }, []);

  return (
    <div className="">
      <Navigation />

      <Outlet />
    </div>
  );
}

export default App;

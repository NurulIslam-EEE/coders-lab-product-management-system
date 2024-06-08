import Navigation from "./components/ui/Navigation";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <Navigation />

      <Outlet />
    </div>
  );
}

export default App;

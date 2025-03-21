import { Outlet, Link } from "react-router-dom";
import Header from "./Components/Header/Header";

const Layout = () => {
  return (
    <div>
      <Header/>
      {/* Renders the child component */}
      <Outlet />
    </div>
  );
};

export default Layout;


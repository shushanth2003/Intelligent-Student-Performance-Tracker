import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Analysis from "./Components/Analysis/Analysis";
import Dashboard from "./Components/Dashboard/Dashboard";
import Student from "./Components/Student/Student";
import Login from "./Components/Account/Login";
import Createaccount from "./Components/Account/Createaccount";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/student", element: <Student /> },
      { path: "/analysis", element: <Analysis /> },
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Createaccount/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

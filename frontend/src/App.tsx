import { Login } from "./pages/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { DashBoard } from "./pages/DashBoard";
import MainNavigation from "./components/MainNavigation";
import AddCar from "./pages/AddCar";
// import CarsContextProvider from "./store/cars-context";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <MainNavigation />,
    children: [
      { path: ":userId", element: <DashBoard></DashBoard> },
      { path: "manager", element: <AddCar></AddCar> },
     
    ],
    
  },
  { path: "/login", element: <Login></Login> },
  { path: "*", element: <Navigate to="/login" replace />, index: true }, // Catch-all route
]);
function App() {
  return (
    // <CarsContextProvider>
      <RouterProvider router={router} />
    // </CarsContextProvider>
  );
}

export default App;

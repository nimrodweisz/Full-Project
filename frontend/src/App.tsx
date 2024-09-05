import { useEffect } from 'react';
import { createInstance } from '@datapunt/matomo-tracker-react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Login } from "./pages/Login";
import { DashBoard } from "./pages/DashBoard";
import MainNavigation from "./components/MainNavigation";
import AddCar from "./pages/AddCar";
import MatomoTracking from "./components/matomoTracking"; // Optional custom tracking logic

// Create Matomo instance
const matomo = createInstance({
  urlBase: 'http://localhost/matomo/matomo/', // Your Matomo URL
  siteId: 3, // Replace with your actual site ID
  trackerUrl: 'http://localhost/matomo/matomo/matomo.php',
  srcUrl: 'http://localhost/matomo/matomo.js',
});

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <>
        <MainNavigation />
        <MatomoTracking /> {/* Optional */}
      </>
    ),
    children: [
      { path: "", element: <Navigate to="/login" replace /> },
      { path: ":userId", element: <DashBoard /> },
      { path: "manager", element: <AddCar /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/login" replace />, index: true }, // Catch-all route
]);

function App() {
  useEffect(() => {
    // Push a page view event when the app starts
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

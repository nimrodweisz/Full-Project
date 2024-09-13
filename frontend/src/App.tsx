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
  urlBase: 'http://localhost/matomo/', // Your Matomo URL
  siteId: 1, // Replace with your actual site ID
  trackerUrl: 'http://localhost/matomo/matomo.php',
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
  { path: "/login", element:(<>
 
  <Login />
  
  </>)  },
  { path: "*", element: <Navigate to="/login" replace />, index: true }, // Catch-all route
]);
declare global {
  interface Window {
    _mtm: any[];
  }
}

function App() {
 
  
  useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
    
    var d = document, 
        g = d.createElement('script'), 
        s = d.getElementsByTagName('script')[0];
  
    if (s && s.parentNode) {  // Ensure s and its parentNode are not null
      g.async = true; 
      g.src = 'http://localhost/matomo/js/container_7b3266Eh.js'; 
      s.parentNode.insertBefore(g, s);
    } else {
      console.warn('No script elements found, appending script to body instead');
      document.body.appendChild(g);
    }
  }, []);
  


  return (
    <RouterProvider router={router} />
  );
}

export default App;

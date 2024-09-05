import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MatomoTracking = () => {
  const location = useLocation();

  const loadMatomoScript = () => {
    // Force _paq to be an array if it's not
    if (!window._paq || !Array.isArray(window._paq)) {
      window._paq = []; // Ensure _paq is initialized as an array
      console.log('Initialized _paq as an array:', window._paq);
    }

    // Push configuration commands before loading the script
    window._paq.push(['setTrackerUrl', 'http://localhost/matomo/matomo/matomo.php']);
    window._paq.push(['setSiteId', '3']); // Your Matomo site ID

    // Inject Matomo script dynamically
    const script = document.createElement('script');
    script.src = 'http://localhost/matomo/matomo/matomo.js'; // URL to your Matomo JS file
    script.async = true;

    script.onload = () => {
      console.log('Matomo script loaded successfully');
      window._paq.push(['trackPageView']);
      console.log('Tracking first page view.');

      // Log _paq state after pushing commands
      console.log('Current _paq state after page view push:', window._paq);
    };

    script.onerror = () => {
      console.error('Failed to load Matomo script.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    loadMatomoScript();

    const pushTrackingCommands = () => {
      if (Array.isArray(window._paq)) {
        console.log('Pushing tracking commands for:', window.location.pathname);
        window._paq.push(['setCustomUrl', window.location.pathname]);
        window._paq.push(['setDocumentTitle', document.title]);
        window._paq.push(['trackPageView']);
        
        // Log _paq state after pushing commands
        console.log('Current _paq state after all commands:', JSON.stringify(window._paq));
      } else {
        console.error('_paq is not initialized as an array.');
      }
    };

    setTimeout(pushTrackingCommands, 500); // Small delay to ensure the script has loaded
  }, [location]);

  return null;
};

export default MatomoTracking;

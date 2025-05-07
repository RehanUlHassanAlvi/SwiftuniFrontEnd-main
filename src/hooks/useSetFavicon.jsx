import { useEffect } from 'react';

const useSetFavicon = () => {
  const storedData = JSON.parse(localStorage.getItem("portalData"));
  
  useEffect(() => {
    if (storedData?.portal_favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = storedData?.portal_favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    if (storedData?.portal_owner_name) {
      const portal = storedData?.portal_owner_name?.charAt(0).toUpperCase() + storedData?.portal_owner_name?.slice(1);
      document.title = portal;
    }
  }, [storedData]);
};

export default useSetFavicon;

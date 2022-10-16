import { useState, useEffect } from "react";

type Location = {
  longitude: number;
  latitude: number;
};

const DEFAULT_LOCATION = {
  longitude: -121.4944,
  latitude: 38.5816,
};

const useLocation = () => {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  return location;
};

export default useLocation;

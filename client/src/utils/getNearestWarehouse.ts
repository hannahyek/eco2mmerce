import { AmazonLocations } from "../assets";

export const getNearstWarehouse = async (location: {
  longitude: number;
  latitude: number;
}) => {
  const { longitude, latitude } = location;

  const nearestWarehouse = AmazonLocations.reduce((prev, curr) => {
    const prevDistance = haversine(
      prev.Latitude,
      prev.Longitude,
      latitude,
      longitude
    );
    const currDistance = haversine(
      curr.Latitude,
      curr.Longitude,
      latitude,
      longitude
    );
    return prevDistance < currDistance ? prev : curr;
  });

  return nearestWarehouse;
};

const radians = (degrees: number) => (degrees * Math.PI) / 180;

// See https://en.wikipedia.org/wiki/Haversine_formula
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6372.8; // km
  const dlat = radians(lat2 - lat1);
  const dlon = radians(lon2 - lon1);
  lat1 = radians(lat1);
  lat2 = radians(lat2);
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
};

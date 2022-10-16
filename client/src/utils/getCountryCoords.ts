import { CountriesLongLat } from "../assets";

const DEFAULT_COORDS = {
  longitude: 35,
  latitude: 105,
};

export const getCountryCoords = (country: string) => {
  const countryCoords = CountriesLongLat.find(
    (countryLongLat) =>
      countryLongLat.Country === country ||
      countryLongLat["ISO 3166 Country Code"] === country
  );
  return {
    longitude: countryCoords?.Longitude || DEFAULT_COORDS.longitude,
    latitude: countryCoords?.Latitude || DEFAULT_COORDS.latitude,
  };
};

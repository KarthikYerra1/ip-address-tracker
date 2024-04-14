/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";

import SearchInput from "./components/SearchInput";
import MapViewContainer from "./components/MapViewContainer";
import DataContainer from "./components/DataContainer";

export const IpTrackerContext = createContext();

const App = () => {
  const [locationData, setLocationData] = useState({
    ip: "8.8.8.8",
    isp: "Google LLC",
    location: {
      city: "Glenmont",
      country: "US",
      lat: 40.52006,
      lng: -82.09737,
      postalCode: "44628",
      region: "Ohio",
      timezone: "-04:00",
    },
  });

  const getLocationInfo = async (status, ip) => {
    const apiUrl = status
      ? `https://geo.ipify.org/api/v1?apiKey=at_VOOrbGXgEBqL0Jn2az5D39hj7EIXW&ipAddress=${ip}`
      : `https://geo.ipify.org/api/v1?apiKey=at_VOOrbGXgEBqL0Jn2az5D39hj7EIXW&domain=${ip}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    setLocationData(data);
  };

  useEffect(() => {
    getLocationInfo(true, "");
  }, []);

  return (
    <>
      <IpTrackerContext.Provider value={{ locationData, getLocationInfo }}>
        <div className="app-container">
          <SearchInput />
        </div>
        <DataContainer />
        <MapViewContainer />
      </IpTrackerContext.Provider>
    </>
  );
};

export default App;

import { useContext } from "react";

import { IpTrackerContext } from "../App";

const DataContainer = () => {
  const { locationData } = useContext(IpTrackerContext);

  const { ip, location, isp } = locationData;
  const {city, country, postalCode, timezone} = location

  return (
    <div className="data-container">
      <div className="actual-data-container">
        <div className="data">
          <h3>IP ADDRESS</h3>
          <p>{ip}</p>
        </div>
        <div className="line"></div>
        <div className="data">
          <h3>location</h3>
          <p>
            {city}, {country} {postalCode}
          </p>
        </div>
        <div className="line"></div>
        <div className="data">
          <h3>timezone</h3>
          <p>{timezone}</p>
        </div>
        <div className="line"></div>
        <div className="data">
          <h3>isp</h3>
          <p>{isp}</p>
        </div>
      </div>
    </div>
  );
};

export default DataContainer;

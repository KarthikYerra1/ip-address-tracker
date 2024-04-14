/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { IpTrackerContext } from "../App";

import iconArrow from "../images/iconArrow.svg";

const SearchInput = () => {
  const { getLocationInfo } = useContext(IpTrackerContext);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(false);
  const [ipStatus, setIpStatus] = useState(true);

  const isValidIpv4 = (ip) => {
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  const isValidIpv6 = (ip) => {
    const zeroReplacementRegex = /:{2,}/g;
    let modifiedIpAddress;
    if (zeroReplacementRegex.test(ip)) {
      modifiedIpAddress = ip.replace(zeroReplacementRegex, ":0000:");
    } else {
      modifiedIpAddress = ip;
    }

    const ipv6Regex = /^(?:[0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/;
    return ipv6Regex.test(modifiedIpAddress);
  };

  const getIpAddress = (IPAddress) => {
    if (isValidIpv4(IPAddress)) {
      getLocationInfo(true, searchInput);
    } else if (isValidIpv6(IPAddress)) {
      getLocationInfo(true, searchInput);
    } else {
      getLocationInfo(false, searchInput);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (searchInput) {
      setError(false);
      getIpAddress(searchInput);
    } else {
      setError(true);
      return;
    }
  };

  return (
    <form role="form" className="search-input-form" onSubmit={onSubmitForm}>
      <h2>IP Address Tracker</h2>
      <div className="search-input-field">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for any IP address or domain..."
          onKeyUp={(e) => e.key === "Enter" && onSubmitForm(e)}
        />
        <button type="submit">
          <img src={iconArrow} alt="arrow-icon" />
        </button>
      </div>
      {error && <p className="error-msg">Invalid IP or Domain</p>}
    </form>
  );
};

export default SearchInput;

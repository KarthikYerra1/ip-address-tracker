/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconLocation from "../images/iconLocation.svg";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import { IpTrackerContext } from "../App";

const MapViewContainer = () => {
  const { locationData } = useContext(IpTrackerContext);
  const { lat, lng, city, timezone, region, country } = locationData.location;
  const position = [lat, lng];
  const mapRef = useRef(null); // Reference to the MapContainer component

  useEffect(() => {
    if (mapRef.current && lat !== undefined && lng !== undefined) {
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  }, [lat, lng]);

  const customIcon = L.icon({
    iconUrl: iconLocation,
    iconSize: [36, 46],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        position={position}
        zoom={10}
        style={{ height: "58vh", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>
            This is the place you are searching for... <br />
            Latitude: {lat}, <br />
            Longitude: {lng} <br />
            Address: {city}, {country}, {region} <br />
            Time Zone: {timezone}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapViewContainer;

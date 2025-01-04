'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import InputDemo from './Input-demo';

const LocationPicker = ({ id, label, error, initialValue, onChange }) => {
  const [showMap, setShowMap] = useState(false); // To toggle map visibility
  const [location, setLocation] = useState({ lat: null, lng: null }); // Coordinates
  const [address, setAddress] = useState(''); // Display address or coordinates as a string

  // Decode initial value if provided (e.g., "SRID=4326;POINT (12.345678 34.56789)")
  useEffect(() => {
    if (initialValue) {
      const match = initialValue.match(/POINT\s*\(([^ ]+)\s+([^ ]+)\)/);
      if (match) {
        const [lat, lng] = match.slice(1).map(Number);
        setLocation({ lat, lng });
        fetchAddress(lat, lng); // Fetch the address
      }
    }
  }, [initialValue]);

  // Function to handle map click
  const handleMapClick = (lat, lng) => {
    setLocation({ lat, lng });
    fetchAddress(lat, lng); // Optionally fetch the address
    setShowMap(false); // Hide the map after selection
    if (onChange) onChange(`SRID=4326;POINT (${lng} ${lat})`);
  };

  // Function to fetch address from coordinates
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const displayName = data.display_name || `${lat}, ${lng}`;
      setAddress(displayName);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(`${lat}, ${lng}`);
    }
  };

  // Component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const customIcon = L.icon({
    iconUrl: '/Vector.png', // Path to your marker image in the public/ folder
    iconSize: [25, 41], // Adjust size to match your marker image
    iconAnchor: [12, 41], // Anchor point so the tip of the marker points to the location
    popupAnchor: [0, -41], // Position the popup above the marker
  });

  return (
    <div className="relative">
      {/* Input Field */}
      <InputDemo
        label={label}
        error={error}
        type="text"
        value={address}
        onFocus={() => setShowMap(true)} // Show map when input is focused
        readOnly
      />
      <input
        id={id}
        type="hidden"
        value={`SRID=4326;POINT (${location.lng || ''} ${location.lat || ''})`}
      />

      {/* Map */}
      {showMap && (
        <div className="absolute top-full left-0 w-full h-64 z-10 rounded">
          <MapContainer
            center={location.lat && location.lng ? [location.lat, location.lng] : [51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: 1000 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <MapClickHandler />
            {location.lat && location.lng && (
              <Marker position={[location.lat, location.lng]} icon={customIcon} />
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;

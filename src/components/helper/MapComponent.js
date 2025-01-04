import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Use the red marker image
const customIcon = L.icon({
  iconUrl: '/Vector.png', // Path to your marker image in the public/ folder
  iconSize: [25, 41], // Adjust size to match your marker image
  iconAnchor: [12, 41], // Anchor point so the tip of the marker points to the location
  popupAnchor: [0, -41], // Position the popup above the marker
});

const MapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p>Invalid location coordinates</p>;
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={5} // Adjust zoom level
      style={{ height: '231px', width: '95%' ,borderRadius:'13px'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>
          Location: {latitude}, {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

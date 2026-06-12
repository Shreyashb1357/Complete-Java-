import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DefaultIcon from "../utils/LealetIconFix";


function MapClickHandler({ markMode, setPickup, setDrop }) {
  useMapEvents({
    click(e) {
      if (markMode === "PICKUP") {
        setPickup(e.latlng);
      } 
      if (markMode === "DROP") {
        setDrop(e.latlng);
      }
    }
  });
  return null;
}

function MapView({ pickup, drop, setPickup, setDrop, markMode }) {
  const center = pickup
    ? [pickup.lat, pickup.lng]
    : [18.5204, 73.8567]; // Pune default

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pickup && (<Marker position={[pickup.lat, pickup.lng]} icon={DefaultIcon} />)}

      {drop && (<Marker position={[drop.lat, drop.lng]} icon={DefaultIcon} /> )}


      <MapClickHandler
        markMode={markMode}
        setPickup={setPickup}
        setDrop={setDrop}
      />
    </MapContainer>
  );
}

export default MapView;

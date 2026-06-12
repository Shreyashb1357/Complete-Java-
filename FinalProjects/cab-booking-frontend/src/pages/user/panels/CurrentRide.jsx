import { useEffect, useState } from "react";
import api from "../../../api/api";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ACTIVE_STATUSES = ["REQUESTED", "ACCEPTED", "STARTED"];

const CurrentRide = ({ userId }) => {
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchCurrentRide = async () => {
      try {
        const ridesRes = await api.get(`/api/rides/user/${userId}`);
        const activeRide = ridesRes.data.find(r =>
          ACTIVE_STATUSES.includes(r.status)
        );

        if (!activeRide) {
          setRide(null);
          setMessage("");
          return;
        }

        setRide(activeRide);

        if (!activeRide.driver) {
          setMessage("Waiting for driver to accept ride...");
          return;
        }

        const trackRes = await api.get(`/api/rides/${activeRide.rideId}/track`);
        setDriverLocation({
          lat: trackRes.data.latitude,
          lng: trackRes.data.longitude,
        });
        setMessage("");
      } catch {
        setMessage("Unable to load current ride");
      }
    };

    fetchCurrentRide();
    const interval = setInterval(fetchCurrentRide, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  if (!ride) return null;

  /* ================= STYLES ================= */
  const cardStyle = {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  };

  const sectionTitle = {
    color: "#00c6ff",
    marginBottom: "10px",
    borderBottom: "1px solid #444",
    paddingBottom: "5px",
  };

  const infoStyle = {
    marginTop: "8px",
    fontSize: "15px",
    lineHeight: "1.5",
  };

  const messageStyle = {
    color: "#ffb84d",
    marginTop: "10px",
  };

  return (
    <div style={cardStyle}>
      <h2 style={sectionTitle}>🚘 Current Ride</h2>

      {/* MAP */}
      {driverLocation && (
        <MapContainer
          center={[driverLocation.lat, driverLocation.lng]}
          zoom={15}
          style={{ height: "300px", width: "100%", borderRadius: "10px", marginBottom: "15px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[driverLocation.lat, driverLocation.lng]} />
        </MapContainer>
      )}

      {/* MESSAGE */}
      {message && <p style={messageStyle}>{message}</p>}

      {/* RIDE DETAILS */}
      <div style={infoStyle}>
        <p><strong>Ride ID:</strong> {ride.rideId}</p>
        <p><strong>Status:</strong> {ride.status}</p>
        <p><strong>Fare:</strong> ₹{ride.fare}</p>
      </div>

      {/* DRIVER DETAILS */}
      {ride.driver && (
        <div style={{ ...infoStyle, marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #444" }}>
          <h3 style={{ color: "#00c6ff", marginBottom: "8px" }}>Driver</h3>
          <p><strong>Name:</strong> {ride.driver.name}</p>
          <p><strong>Phone:</strong> {ride.driver.phone}</p>
          <p><strong>Vehicle:</strong> {ride.driver.vehicleNumber}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentRide;









// import { useEffect, useState } from "react";
// import api from "../../../api/api";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const ACTIVE_STATUSES = ["REQUESTED", "ACCEPTED", "STARTED"];

// const CurrentRide = ({ userId }) => {
//   const [ride, setRide] = useState(null);
//   const [driverLocation, setDriverLocation] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!userId) return;

//     const fetchCurrentRide = async () => {
//       try {
//         // 🔹 1. Get all user rides
//         const ridesRes = await api.get(`/api/rides/user/${userId}`);

//         // 🔹 2. Find active ride
//         const activeRide = ridesRes.data.find(r =>
//           ACTIVE_STATUSES.includes(r.status)
//         );

//         if (!activeRide) {
//           setRide(null);
//           setMessage("");
//           return;
//         }

//         setRide(activeRide);

//         // 🔹 3. Driver logic
//         if (!activeRide.driver) {
//           setMessage("Waiting for driver to accept ride...");
//           return;
//         }

//         // 🔹 4. Track driver only if started / accepted
//         const trackRes = await api.get(`/api/rides/${activeRide.rideId}/track`);
//         setDriverLocation({
//           lat: trackRes.data.latitude,
//           lng: trackRes.data.longitude,
//         });
//         setMessage("");
//       } catch {
//         setMessage("Unable to load current ride");
//       }
//     };

//     fetchCurrentRide();

//     // 🔁 Uber-style polling
//     const interval = setInterval(fetchCurrentRide, 5000);
//     return () => clearInterval(interval);
//   }, [userId]);

//   // 🚫 No active ride → show nothing (Uber behavior)
//   if (!ride) return null;

//   return (
//     <div className="current-ride">
//       <h3>Current Ride</h3>

//       {/* MAP */}
//       {driverLocation && (
//         <MapContainer
//           center={[driverLocation.lat, driverLocation.lng]}
//           zoom={15}
//           style={{ height: "350px", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[driverLocation.lat, driverLocation.lng]} />
//         </MapContainer>
//       )}

//       {/* STATUS */}
//       {message && (
//         <p style={{ color: "#856404", marginTop: "10px" }}>
//           {message}
//         </p>
//       )}

//       {/* RIDE DETAILS */}
//       <div style={{ marginTop: "10px" }}>
//         <p><strong>Ride ID:</strong> {ride.rideId}</p>
//         <p><strong>Status:</strong> {ride.status}</p>
//         <p><strong>Fare:</strong> ₹{ride.fare}</p>
//       </div>

//       {/* DRIVER DETAILS */}
//       {ride.driver && (
//         <div style={{ marginTop: "10px" }}>
//           <h4>Driver</h4>
//           <p><strong>Name:</strong> {ride.driver.name}</p>
//           <p><strong>Phone:</strong> {ride.driver.phone}</p>
//           <p><strong>Vehicle:</strong> {ride.driver.vehicleNumber}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrentRide;

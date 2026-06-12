import { useEffect, useState } from "react";
import api from "../../../api/api";
import L from "leaflet";

const RideHistory = ({ userId }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const getAddressFromLatLng = async (lat, lng) => {
    if (!lat || !lng) return "";
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return data.display_name || `${lat}, ${lng}`;
    } catch (err) {
      console.error("Reverse geocoding failed", err);
      return `${lat}, ${lng}`;
    }
  };

  const loadRides = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/api/rides/user/${userId}`);
      let ridesData = res.data || [];

      ridesData = await Promise.all(
        ridesData.map(async (ride) => {
          const pickupAddress =
            ride.pickupAddress ||
            (ride.pickupLat && ride.pickupLng
              ? await getAddressFromLatLng(ride.pickupLat, ride.pickupLng)
              : "");
          const dropAddress =
            ride.dropAddress ||
            (ride.dropLat && ride.dropLng
              ? await getAddressFromLatLng(ride.dropLat, ride.dropLng)
              : "");
          return { ...ride, pickupAddress, dropAddress };
        })
      );

      setRides(ridesData);
    } catch (err) {
      console.error(err);
      setError("Failed to load ride history");
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    const next = !showHistory;
    setShowHistory(next);

    if (next && rides.length === 0) {
      loadRides();
    }
  };

  if (!userId) return null;

  return (
    <div className="ride-history" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Ride History</h3>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={toggleHistory}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {showHistory ? "Hide Ride History" : "View Ride History"}
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading rides...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {showHistory && !loading && (
        rides.length === 0 ? (
          <p style={{ textAlign: "center" }}>No rides found</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {rides.map((ride) => (
              <div
                key={ride.rideId}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  padding: "15px 20px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "transform 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h4 style={{ margin: 0 }}>Ride #{ride.rideId}</h4>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor:
                        ride.status === "COMPLETED"
                          ? "#28a745"
                          : ride.status === "CANCELLED"
                          ? "#dc3545"
                          : "#ffc107",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    {ride.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  <div>
                    <strong>Driver:</strong> {ride.driver.name} ({ride.driver.vehicleNumber})
                  </div>
                  <div>
                    <strong>Fare:</strong> ₹{Number(ride.fare).toFixed(2)}
                  </div>
                  <div>
                    <strong>Distance:</strong> {ride.distance.toFixed(2)} km
                  </div>
                  <div>
                    <strong>Payment:</strong>{" "}
                    <span
                      style={{
                        color: ride.paymentStatus === "PAID" ? "#28a745" : "#dc3545",
                        fontWeight: "bold",
                      }}
                    >
                      {ride.paymentStatus}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div>
                    <strong>Pickup:</strong> {ride.pickupAddress}
                  </div>
                  <div>
                    <strong>Drop:</strong> {ride.dropAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default RideHistory;

// import { useEffect, useState } from "react";
// import api from "../../../api/api";
// import L from "leaflet"; // needed for latLng

// const RideHistory = ({ userId }) => {
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showHistory, setShowHistory] = useState(false);

//   const getAddressFromLatLng = async (lat, lng) => {
//     if (!lat || !lng) return "";
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const data = await res.json();
//       return data.display_name || `${lat}, ${lng}`;
//     } catch (err) {
//       console.error("Reverse geocoding failed", err);
//       return `${lat}, ${lng}`;
//     }
//   };

//   const loadRides = async () => {
//     if (!userId) return;

//     try {
//       setLoading(true);
//       setError("");

//       const res = await api.get(`/api/rides/user/${userId}`);
//       let ridesData = res.data || [];

//       // Fetch pickup/drop addresses if not already present
//       ridesData = await Promise.all(
//         ridesData.map(async (ride) => {
//           const pickupAddress =
//             ride.pickupAddress ||
//             (ride.pickupLat && ride.pickupLng ? await getAddressFromLatLng(ride.pickupLat, ride.pickupLng): "");
//           const dropAddress =
//             ride.dropAddress ||
//             (ride.dropLat && ride.dropLng
//               ? await getAddressFromLatLng(ride.dropLat, ride.dropLng)
//               : "");
//           return { ...ride, pickupAddress, dropAddress };
//         })
//       );

//       setRides(ridesData);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load ride history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleHistory = () => {
//     const next = !showHistory;
//     setShowHistory(next);

//     // Load rides only when opening
//     if (next && rides.length === 0) {
//       loadRides();
//     }
//   };

//   if (!userId) return null;

//   return (
//     <div className="ride-history">
//       <h3>Ride History</h3>

//       {/* Toggle button */}
//       <button onClick={toggleHistory} style={{ marginBottom: "10px" }}>
//         {showHistory ? "Hide Ride History" : "View Ride History"}
//       </button>

//       {/* Loading / Error */}
//       {loading && <p>Loading rides...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Ride history table */}
//       {showHistory && !loading &&
//         (rides.length === 0 ? (
//           <p>No rides found</p>
//         ) : (
//           <table
//             style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
//           >
//             <thead>
//               <tr style={{ background: "#f5f5f5" }}>
//                 <th style={thStyle}>Ride ID</th>
//                 <th style={thStyle}>Driver Name</th>
//                 <th style={thStyle}>Vehicle No.</th>
//                 <th style={thStyle}>Pickup</th>
//                 <th style={thStyle}>Drop</th>
//                 <th style={thStyle}>Total Distance</th>
//                 <th style={thStyle}>Fare (₹)</th>
//                 <th style={thStyle}>Payment Status</th>
//                 <th style={thStyle}>Ride Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rides.map((ride) => {
//                 return (
//                   <tr key={ride.rideId}>
//                     <td style={tdStyle}>{ride.rideId}</td>
//                     <td style={tdStyle}>{ride.driver.name}</td>
//                     <td style={tdStyle}>{ride.driver.vehicleNumber}</td>
//                     <td style={tdStyle}>{ride.pickupAddress}</td>
//                     <td style={tdStyle}>{ride.dropAddress}</td>
//                     <td style={tdStyle}>{ride.distance.toFixed(2)} km</td>
//                     <td style={tdStyle}>₹ {Number(ride.fare).toFixed(2)}</td>
//                     <td style={tdStyle}>{ride.paymentStatus}</td>
//                     <td style={tdStyle}>{ride.status}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ))
//       }
//     </div>
//   );
// };

// /* Table styles */
// const thStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
//   textAlign: "left",
// };

// const tdStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
// };

// export default RideHistory;






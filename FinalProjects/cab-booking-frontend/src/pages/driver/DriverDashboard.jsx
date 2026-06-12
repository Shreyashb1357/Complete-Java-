import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LiveTracking from "./LiveTracking";
import EmbedMap from "./EmbedMap";
import { useParams } from "react-router-dom";

const colors = {
  bg: "#0b0b0f",
  card: "#14141a",
  border: "#22222c",
  text: "#eaeaf0",
  muted: "#9a9aa5",
  blue: "#1f6fff",
  green: "#1dbf73",
  red: "#ff4d4f",
  yellow: "#f5c542",
};

const card = {
  background: colors.card,
  borderRadius: "14px",
  padding: "20px",
  border: `1px solid ${colors.border}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  marginBottom: "22px",
};

const DriverDashboard = () => {
  const { driverId } = useParams();

  const [driver, setDriver] = useState(null);
  const [rides, setRides] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const countdownRef = useRef(null);
  const pauseCountdown = useRef(false);
  const [showRideHistory, setShowRideHistory] = useState(true);

  const isOnline = driver?.available ?? driver?.isAvailable ?? false;

  const fetchDriverInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/drivers/${driverId}`);
      setDriver(res.data);
    } catch {}
  };

  const fetchDriverRides = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/drivers/${driverId}/rides`
      );
      setRides(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchDriverInfo();
    fetchDriverRides();
  }, [driverId]);

  const toggleAvailability = async () => {
    try {
      const newStatus = !isOnline;
      await axios.put(
        `http://localhost:8080/api/drivers/${driverId}/availability`,
        null,
        { params: { isAvailable: newStatus } }
      );

      setDriver((prev) => ({
        ...prev,
        available: newStatus,
        isAvailable: newStatus,
      }));
    } catch {}
  };

  const startRide = async (rideId) => {
    await axios.put(`http://localhost:8080/api/rides/${rideId}/start`);
    setCountdown(null);
    fetchDriverRides();
  };

  const endRide = async (rideId) => {
    await axios.put(`http://localhost:8080/api/rides/${rideId}/complete`);
    fetchDriverRides();
  };

  const rejectRide = async (rideId) => {
    await axios.post(`http://localhost:8080/api/rides/reject/${rideId}`);
    setCountdown(null);
    fetchDriverRides();
  };

  const activeRide = rides.find(
    (r) => r.status === "REQUESTED" || r.status === "STARTED"
  );

  const completedRides = rides.filter((r) => r.status === "COMPLETED");

  const totalEarnings = completedRides.reduce(
    (sum, r) => sum + (r.fare || 0),
    0
  );

  useEffect(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);

    if (activeRide?.status === "REQUESTED") {
      setCountdown(60);
      countdownRef.current = setInterval(() => {
        if (!pauseCountdown.current) {
          setCountdown((prev) => {
            if (prev === 1) {
              rejectRide(activeRide.rideId);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(countdownRef.current);
  }, [activeRide]);

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, padding: "30px", color: colors.text }}>
      <h1 style={{ marginBottom: "6px" }}>🚖 Driver Control Center</h1>
      <p style={{ color: colors.muted, marginBottom: "24px" }}>
        Manage rides, track earnings, and control your availability in real-time.
      </p>

      {/* DRIVER PROFILE */}
      {driver && (
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h2>{driver.name}</h2>
              <p style={{ color: colors.muted }}>{driver.email}</p>
              <p style={{ color: colors.muted }}>{driver.phone}</p>
              <p style={{ marginTop: "10px", color: colors.muted }}>
                Driver ID: <b>{driver.driverId}</b>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  background: isOnline ? colors.green : colors.red,
                  fontWeight: "bold",
                }}
              >
                {isOnline ? "ONLINE & READY" : "OFFLINE"}
              </div>

              <button
                onClick={toggleAvailability}
                style={{
                  marginTop: "14px",
                  padding: "10px 22px",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  background: isOnline ? colors.red : colors.green,
                  color: "#fff",
                  boxShadow: "0 0 12px rgba(0,0,0,0.4)",
                }}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        <div style={card}>
          <h4>Total Trips</h4>
          <h1>{rides.length}</h1>
          <p style={{ color: colors.muted }}>All rides assigned to you</p>
        </div>
        <div style={card}>
          <h4>Completed Trips</h4>
          <h1>{completedRides.length}</h1>
          <p style={{ color: colors.muted }}>Successfully finished rides</p>
        </div>
        <div style={card}>
          <h4>Total Earnings</h4>
          <h1>₹{totalEarnings.toFixed(2)}</h1>
          <p style={{ color: colors.muted }}>Lifetime earnings till now</p>
        </div>
      </div>

      {/* ACTIVE RIDE */}
      <h2 style={{ marginTop: "30px" }}>🚦 Current Ride Status</h2>
      <p style={{ color: colors.muted }}>
        Monitor your ongoing ride and take quick actions.
      </p>

      {!activeRide && <p style={{ color: colors.muted }}>No active ride at the moment.</p>}

      {activeRide && (
        <div style={{ ...card, borderLeft: `6px solid ${colors.blue}` }}>
          <p><b>Ride ID:</b> {activeRide.rideId}</p>
          <p><b>Status:</b> {activeRide.status}</p>

          <EmbedMap
            pickupLat={activeRide.pickupLat}
            pickupLng={activeRide.pickupLng}
            dropLat={activeRide.dropLat}
            dropLng={activeRide.dropLng}
          />

          {activeRide.status === "REQUESTED" && (
            <>
              <p style={{ marginTop: "12px", color: colors.yellow }}>
                ⏳ Accept within <b>{countdown}s</b> or ride will be auto-rejected.
              </p>

              <button
                onClick={() => startRide(activeRide.rideId)}
                onMouseEnter={() => (pauseCountdown.current = true)}
                onMouseLeave={() => (pauseCountdown.current = false)}
                disabled={!isOnline}
                style={{
                  padding: "10px 22px",
                  borderRadius: "25px",
                  background: colors.green,
                  color: "#fff",
                  border: "none",
                  marginRight: "10px",
                }}
              >
                Accept Ride
              </button>

              <button
                onClick={() => rejectRide(activeRide.rideId)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "25px",
                  background: colors.red,
                  color: "#fff",
                  border: "none",
                }}
              >
                Reject
              </button>
            </>
          )}

          {activeRide.status === "STARTED" && (
            <>
              <button
                onClick={() => endRide(activeRide.rideId)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "25px",
                  background: colors.yellow,
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Complete Ride
              </button>

              <LiveTracking rideId={activeRide.rideId} />
            </>
          )}
        </div>
      )}

      {/* HISTORY */}
      <h2>📜 Ride History</h2>
      <p style={{ color: colors.muted }}>
        Review your completed trips and payment status.
      </p>

      <button
        onClick={() => setShowRideHistory(!showRideHistory)}
        style={{
          marginBottom: "14px",
          padding: "8px 20px",
          borderRadius: "20px",
          background: colors.blue,
          border: "none",
          color: "#fff",
        }}
      >
        {showRideHistory ? "Hide History" : "Show History"}
      </button>

      {showRideHistory && (
        <div style={card}>
          {completedRides.length === 0 ? (
            <p style={{ color: colors.muted }}>No completed rides yet.</p>
          ) : (
            <table width="100%" cellPadding="10">
              <thead style={{ color: colors.muted }}>
                <tr>
                  <th>ID</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Fare</th>
                  <th>Payment</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {completedRides.map((r) => (
                  <tr key={r.rideId}>
                    <td>{r.rideId}</td>
                    <td>{r.pickupAddress}</td>
                    <td>{r.dropAddress}</td>
                    <td>₹{r.fare}</td>
                    <td>{r.paymentStatus}</td>
                    <td>{r.user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;






// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import LiveTracking from "./LiveTracking";
// import EmbedMap from "./EmbedMap";
// import { useParams } from "react-router-dom";

// const DriverDashboard = () => {
//   const { driverId } = useParams();

//   const [driver, setDriver] = useState(null);
//   const [rides, setRides] = useState([]);
//   const [countdown, setCountdown] = useState(null); // countdown for ride request

//   const countdownRef = useRef(null); // interval ID
//   const pauseCountdown = useRef(false); // pause flag
//   const [showRideHistory, setShowRideHistory] = useState(true);


//   /* ================= SAFE DERIVED STATE ================= */
//   const isOnline = driver?.available ?? driver?.isAvailable ?? false;

//   /* ================= FETCH DRIVER INFO ================= */
//   const fetchDriverInfo = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/drivers/${driverId}`
//       );
//       setDriver(res.data);
//     } catch (err) {
//       console.error("Failed to load driver info", err);
//     }
//   };

//   /* ================= FETCH DRIVER RIDES ================= */
//   const fetchDriverRides = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/drivers/${driverId}/rides`
//       );
//       setRides(res.data);
//     } catch (err) {
//       console.error("Failed to fetch rides", err);
//     }
//   };

//   useEffect(() => {
//     fetchDriverInfo();
//     fetchDriverRides();
//   }, [driverId]);

//   /* ================= AVAILABILITY ================= */
//   const toggleAvailability = async () => {
//     try {
//       const newStatus = !isOnline;

//       await axios.put(
//         `http://localhost:8080/api/drivers/${driverId}/availability`,
//         null,
//         { params: { isAvailable: newStatus } }
//       );

//       setDriver((prev) => ({
//         ...prev,
//         available: newStatus,
//         isAvailable: newStatus,
//       }));
//     } catch (err) {
//       alert("Failed to update availability");
//     }
//   };

//   /* ================= RIDE ACTIONS ================= */
//   const startRide = async (rideId) => {
//     try {
//       await axios.put(`http://localhost:8080/api/rides/${rideId}/start`);
//       setCountdown(null); // stop countdown
//       fetchDriverRides();
//     } catch {
//       alert("Failed to start ride");
//     }
//   };

//   const endRide = async (rideId) => {
//     try {
//       await axios.put(`http://localhost:8080/api/rides/${rideId}/complete`);
//       fetchDriverRides();
//     } catch {
//       alert("Failed to end ride");
//     }
//   };

//   const rejectRide = async (rideId) => {
//     try {
//       await axios.post(`http://localhost:8080/api/rides/reject/${rideId}`);
//       setCountdown(null); // stop countdown
//       fetchDriverRides();
//     } catch (err) {
//       console.error("Failed to reject ride", err);
//     }
//   };

//   /* ================= DERIVED DATA ================= */
//   const activeRide = rides.find(
//     (r) => r.status === "REQUESTED" || r.status === "STARTED"
//   );

//   const completedRides = rides.filter((r) => r.status === "COMPLETED");

//   const totalEarnings = completedRides.reduce(
//     (sum, r) => sum + (r.fare || 0),
//     0
//   );

//   /* ================= COUNTDOWN EFFECT ================= */
//   useEffect(() => {
//     // clear previous interval
//     if (countdownRef.current) clearInterval(countdownRef.current);

//     if (activeRide && activeRide.status === "REQUESTED") {
//       setCountdown(60);

//       countdownRef.current = setInterval(() => {
//         if (!pauseCountdown.current) {
//           setCountdown((prev) => {
//             if (prev === 1) {
//               rejectRide(activeRide.rideId); // auto reject
//               clearInterval(countdownRef.current);
//               return 0;
//             }
//             return prev - 1;
//           });
//         }
//       }, 1000);
//     } else {
//       setCountdown(null);
//     }

//     return () => clearInterval(countdownRef.current);
//   }, [activeRide]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Driver Dashboard</h2>

//       {/* ================= DRIVER INFO ================= */}
//       {driver && (
//         <div style={{ border: "1px solid #444", padding: "10px", marginBottom: "20px" }}>
//           <h3>Driver Info</h3>
//           <p><b>ID:</b> {driver.driverId}</p>
//           <p><b>Name:</b> {driver.name}</p>
//           <p><b>Email:</b> {driver.email}</p>
//           <p><b>Phone:</b> {driver.phone}</p>
//           <p><b>Status:</b> {isOnline ? "ONLINE" : "OFFLINE"}</p>

//           <button
//             onClick={toggleAvailability}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: isOnline ? "#dc3545" : "#28a745",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             {isOnline ? "Go Offline" : "Go Online"}
//           </button>
//         </div>
//       )}

//       {/* ================= SUMMARY ================= */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Total Rides</b>
//           <p>{rides.length}</p>
//         </div>
//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Completed</b>
//           <p>{completedRides.length}</p>
//         </div>
//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Total Earnings</b>
//           <p>₹{totalEarnings.toFixed(2)}</p>
//         </div>
//       </div>

//       {/* ================= OFFLINE WARNING ================= */}
//       {!isOnline && (
//         <div style={{
//           backgroundColor: "#fff3cd",
//           color: "#856404",
//           padding: "10px",
//           marginBottom: "15px",
//           border: "1px solid #ffeeba",
//         }}>
//           ⚠️ You are currently OFFLINE. Go ONLINE to accept or start rides.
//         </div>
//       )}

//       {/* ================= ACTIVE RIDE ================= */}
//       <h3>Active Ride</h3>
//       {!activeRide && <p>No active ride</p>}

//       {activeRide && (
//         <div style={{ border: "1px solid #333", padding: "10px", marginBottom: "20px" }}>
//           <p><b>Ride ID:</b> {activeRide.rideId}</p>
//           <p><b>Status:</b> {activeRide.status}</p>

//           <EmbedMap
//             pickupLat={activeRide.pickupLat}
//             pickupLng={activeRide.pickupLng}
//             dropLat={activeRide.dropLat}
//             dropLng={activeRide.dropLng}
//           />

//           {/* ================= REQUESTED RIDE ================= */}
//           {activeRide.status === "REQUESTED" && (
//             <div style={{ marginTop: "10px" }}>
//               <p><b>Time to respond:</b> {countdown} sec</p>

//               <button
//                 onClick={() => startRide(activeRide.rideId)}
//                 onMouseEnter={() => (pauseCountdown.current = true)}
//                 onMouseLeave={() => (pauseCountdown.current = false)}
//                 disabled={!isOnline}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   cursor: isOnline ? "pointer" : "not-allowed",
//                   marginRight: "10px",
//                 }}
//               >
//                 Accept
//               </button>

//               <button
//                 onClick={() => rejectRide(activeRide.rideId)}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#dc3545",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Reject
//               </button>
//             </div>
//           )}

//           {/* ================= STARTED RIDE ================= */}
//           {activeRide.status === "STARTED" && (
//             <>
//               <button onClick={() => endRide(activeRide.rideId)}>End Ride</button>
//               <LiveTracking rideId={activeRide.rideId} />
//             </>
//           )}
//         </div>
//       )}


//           {/* ================= RIDE HISTORY ================= */}
         
//           <h3>Ride History</h3>
//           <button
//             onClick={() => setShowRideHistory(!showRideHistory)}
//             style={{
//               marginBottom: "10px",
//               padding: "8px 16px",
//               backgroundColor: "#0d6efd",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {showRideHistory ? "Hide Ride History" : "Show Ride History"}
//           </button>

//           {showRideHistory && (
//           <> 
//           {completedRides.length === 0 ? (
//             <p>No completed rides</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#f2f2f2" }}>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ride ID</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Pickup</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Drop</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Fare (₹)</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Payment Status (₹)</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ride Status</th>
//                   <th style={{ border: "1px solid #ccc", padding: "8px" }}>User name</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {completedRides.map((ride) => (
//                   <tr key={ride.rideId}>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>{ride.rideId}</td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                       {ride.pickupAddress || `${ride.pickupLat}, ${ride.pickupLng}`}
//                     </td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                       {ride.dropAddress || `${ride.dropLat}, ${ride.dropLng}`}
//                     </td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                       ₹ {Number(ride.fare).toFixed(2)}
//                     </td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                       {ride.paymentStatus}
//                     </td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>{ride.status}</td>
//                     <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                       {ride.user.name}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           </>
//           )}



//     </div>
//   );
// };

// export default DriverDashboard;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LiveTracking from "./LiveTracking";
// import EmbedMap from "./EmbedMap";
// import { useParams } from "react-router-dom";

// const DriverDashboard = () => {
//   const { driverId } = useParams();

//   const [driver, setDriver] = useState(null);
//   const [rides, setRides] = useState([]);

//   /* ================= SAFE DERIVED STATE ================= */
//   const isOnline = driver?.available ?? driver?.isAvailable ?? false;

//   /* ================= FETCH DRIVER INFO ================= */
//   const fetchDriverInfo = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/drivers/${driverId}`
//       );
//       setDriver(res.data);
//     } catch (err) {
//       console.error("Failed to load driver info", err);
//     }
//   };

//   /* ================= FETCH DRIVER RIDES ================= */
//   const fetchDriverRides = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/drivers/${driverId}/rides`
//       );
//       setRides(res.data);
//     } catch (err) {
//       console.error("Failed to fetch rides", err);
//     }
//   };

//   useEffect(() => {
//     fetchDriverInfo();
//     fetchDriverRides();
//   }, [driverId]);

//   /* ================= AVAILABILITY ================= */
//   const toggleAvailability = async () => {
//     try {
//       const newStatus = !isOnline;

//       await axios.put(
//         `http://localhost:8080/api/drivers/${driverId}/availability`,
//         null,
//         { params: { isAvailable: newStatus } }
//       );

//       // optimistic UI update
//       setDriver((prev) => ({
//         ...prev,
//         available: newStatus,
//         isAvailable: newStatus,
//       }));
//     } catch (err) {
//       alert("Failed to update availability");
//     }
//   };

//   /* ================= RIDE ACTIONS ================= */
//   const startRide = async (rideId) => {
//     try {
//       await axios.put(`http://localhost:8080/api/rides/${rideId}/start`);
//       fetchDriverRides();
//     } catch {
//       alert("Failed to start ride");
//     }
//   };

//   const endRide = async (rideId) => {
//     try {
//       await axios.put(`http://localhost:8080/api/rides/${rideId}/complete`);
//       fetchDriverRides();
//     } catch {
//       alert("Failed to end ride");
//     }
//   };

//   /* ================= DERIVED DATA ================= */
//   const activeRide = rides.find(
//     (r) => r.status === "REQUESTED" || r.status === "STARTED"
//   );

//   const completedRides = rides.filter((r) => r.status === "COMPLETED");

//   const totalEarnings = completedRides.reduce(
//     (sum, r) => sum + (r.fare || 0),
//     0
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Driver Dashboard</h2>

//       {/* ================= DRIVER INFO ================= */}
//       {driver && (
//         <div style={{ border: "1px solid #444", padding: "10px", marginBottom: "20px" }}>
//           <h3>Driver Info</h3>
//           <p><b>ID:</b> {driver.driverId}</p>
//           <p><b>Name:</b> {driver.name}</p>
//           <p><b>Email:</b> {driver.email}</p>
//           <p><b>Phone:</b> {driver.phone}</p>
//           <p><b>Status:</b> {isOnline ? "ONLINE" : "OFFLINE"}</p>

//           <button
//             onClick={toggleAvailability}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: isOnline ? "#dc3545" : "#28a745",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             {isOnline ? "Go Offline" : "Go Online"}
//           </button>
//         </div>
//       )}

//       {/* ================= SUMMARY ================= */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Total Rides</b>
//           <p>{rides.length}</p>
//         </div>

//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Completed</b>
//           <p>{completedRides.length}</p>
//         </div>

//         <div style={{ border: "1px solid #aaa", padding: "10px", width: "150px" }}>
//           <b>Total Earnings</b>
//           <p>₹{totalEarnings}</p>
//         </div>
//       </div>

//       {/* ================= OFFLINE WARNING ================= */}
//       {!isOnline && (
//         <div
//           style={{
//             backgroundColor: "#fff3cd",
//             color: "#856404",
//             padding: "10px",
//             marginBottom: "15px",
//             border: "1px solid #ffeeba",
//           }}
//         >
//           ⚠️ You are currently OFFLINE. Go ONLINE to accept or start rides.
//         </div>
//       )}

//       {/* ================= ACTIVE RIDE ================= */}
//       <h3>Active Ride</h3>

//       {!activeRide && <p>No active ride</p>}

//       {activeRide && (
//         <div style={{ border: "1px solid #333", padding: "10px", marginBottom: "20px" }}>
//           <p><b>Ride ID:</b> {activeRide.rideId}</p>
//           <p><b>Status:</b> {activeRide.status}</p>

//           <EmbedMap
//             pickupLat={activeRide.pickupLat}
//             pickupLng={activeRide.pickupLng}
//             dropLat={activeRide.dropLat}
//             dropLng={activeRide.dropLng}
//           />

//           {activeRide.status === "REQUESTED" && (
//             <button
//               onClick={() => startRide(activeRide.rideId)}
//               disabled={!isOnline}
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: isOnline ? "#007bff" : "#999",
//                 color: "white",
//                 border: "none",
//                 cursor: isOnline ? "pointer" : "not-allowed",
//               }}
//             >
//               Start Ride
//             </button>
//           )}

//           {activeRide.status === "STARTED" && (
//             <>
//               <button onClick={() => endRide(activeRide.rideId)}>
//                 End Ride
//               </button>
//               <LiveTracking rideId={activeRide.rideId} />
//             </>
//           )}
//         </div>
//       )}

//       {/* ================= RIDE HISTORY ================= */}
//       <h3>Ride History</h3>

//       {completedRides.length === 0 && <p>No completed rides</p>}

//       {completedRides.map((ride) => (
//         <div
//           key={ride.rideId}
//           style={{ borderBottom: "1px solid #ccc", padding: "8px" }}
//         >
//           <p>
//             <b>Ride ID:</b> {ride.rideId} | <b>Fare:</b> ₹{Number(ride.fare).toFixed(2)}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DriverDashboard;

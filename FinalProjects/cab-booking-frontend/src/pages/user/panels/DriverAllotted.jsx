import { useEffect, useState } from "react";
import api from "../../../api/api";

const DriverAllotted = ({ rideId }) => {
  const [ride, setRide] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | waiting | assigned | unavailable | error

  useEffect(() => {
    if (rideId === null) {
      setStatus("unavailable");
      return;
    }

    if (!rideId) return;

    setStatus("waiting");

    const fetchRide = async () => {
      try {
        const res = await api.get(`/api/rides/${rideId}`);

        if (!res.data) {
          setStatus("unavailable");
          return;
        }

        setRide(res.data);

        if (res.data.driver) {
          setStatus("assigned");
        } else {
          setStatus("waiting");
        }
      } catch {
        setStatus("error");
      }
    };

    fetchRide();
    const interval = setInterval(fetchRide, 5000);
    return () => clearInterval(interval);
  }, [rideId]);

  /* ================= STYLES ================= */
  const cardStyle = {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  };

  const titleStyle = {
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

  const statusColors = {
    waiting: "#ffb84d",
    unavailable: "#dc3545",
    error: "#dc3545",
    assigned: "#28a745",
  };

  /* ================= UI STATES ================= */
  if (status === "unavailable") {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Driver Status</h3>
        <p style={{ color: statusColors.unavailable }}>No drivers are available to allocate.</p>
      </div>
    );
  }

  if (status === "waiting") {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Driver Status</h3>
        <p style={{ color: statusColors.waiting }}>Waiting for driver to accept the ride...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Driver Status</h3>
        <p style={{ color: statusColors.error }}>Unable to fetch driver status. Please try again.</p>
      </div>
    );
  }

  if (status === "assigned" && ride?.driver) {
    const { driver } = ride;
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Driver Assigned</h3>
        <div style={infoStyle}>
          <p><strong>Name:</strong> {driver.name || "N/A"}</p>
          <p><strong>Phone:</strong> {driver.phone || "N/A"}</p>
          <p><strong>Vehicle No:</strong> {driver.vehicleNumber || "N/A"}</p>
          <p><strong>Ride Status:</strong> <span style={{ color: statusColors.assigned }}>{ride.status}</span></p>
        </div>
      </div>
    );
  }

  return null;
};

export default DriverAllotted;






// import { useEffect, useState } from "react";
// import api from "../../../api/api";

// const DriverAllotted = ({ rideId }) => {
//   const [ride, setRide] = useState(null);
//   const [status, setStatus] = useState("idle"); 
//   // idle | waiting | assigned | unavailable | error

//   useEffect(() => {
//     // 🚫 Book ride failed → no ride created
//     if (rideId === null) {
//       setStatus("unavailable");
//       return;
//     }

//     if (!rideId) return;

//     setStatus("waiting");

//     const fetchRide = async () => {
//       try {
//         const res = await api.get(`/api/rides/${rideId}`);

//         if (!res.data) {
//           setStatus("unavailable");
//           return;
//         }

//         setRide(res.data);

//         if (res.data.driver) {
//           setStatus("assigned");
//         } else {
//           setStatus("waiting");
//         }
//       } catch {
//         setStatus("error");
//       }
//     };

//     // initial fetch
//     fetchRide();

//     // 🔁 poll every 5s (Uber-like)
//     const interval = setInterval(fetchRide, 5000);

//     return () => clearInterval(interval);
//   }, [rideId]);

//   /* ================= UI STATES ================= */

//   // ❌ No drivers at booking time
//   if (status === "unavailable") {
//     return (
//       <div className="driver-allotted">
//         <h3>Driver Status</h3>
//         <p style={{ color: "#dc3545" }}>
//           No drivers are available to allocate.
//         </p>
//       </div>
//     );
//   }

//   // ⏳ Waiting for driver
//   if (status === "waiting") {
//     return (
//       <div className="driver-allotted">
//         <h3>Driver Status</h3>
//         <p style={{ color: "#856404" }}>
//           Waiting for driver to accept the ride...
//         </p>
//       </div>
//     );
//   }

//   // ⚠️ Backend error
//   if (status === "error") {
//     return (
//       <div className="driver-allotted">
//         <h3>Driver Status</h3>
//         <p style={{ color: "#dc3545" }}>
//           Unable to fetch driver status. Please try again.
//         </p>
//       </div>
//     );
//   }

//   // ✅ Driver assigned
//   if (status === "assigned" && ride?.driver) {
//     const { driver } = ride;

//     return (
//       <div className="driver-allotted">
//         <h3>Driver Assigned</h3>

//         <p><strong>Name:</strong> {driver.name || "N/A"}</p>
//         <p><strong>Phone:</strong> {driver.phone || "N/A"}</p>
//         <p><strong>Vehicle No:</strong> {driver.vehicleNumber || "N/A"}</p>
//         <p><strong>Ride Status:</strong> {ride.status}</p>
//       </div>
//     );
//   }

//   return null;
// };

// export default DriverAllotted;

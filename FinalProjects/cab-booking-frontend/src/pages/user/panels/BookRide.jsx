import { useState } from "react";
import api from "../../../api/api";
import MapPicker from "../../../components/MapPicker";

const BookRide = ({ userId, onRideBooked }) => {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [pickupName, setPickupName] = useState("");
  const [dropName, setDropName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rideResponse, setRideResponse] = useState(null);

  const handleSelect = async (type, latlng) => {
    const place = await getPlaceName(latlng.lat, latlng.lng);
    if (type === "pickup") {
      setPickup(latlng);
      setPickupName(place);
    } else if (type === "drop") {
      setDrop(latlng);
      setDropName(place);
    }
  };

  const handleClear = () => {
    setPickup(null);
    setDrop(null);
    setPickupName("");
    setDropName("");
    setError("");
    setSuccess("");
  };

  const bookRide = async () => {
    if (!pickup || !drop) {
      setError("Please select pickup and drop location");
      return;
    }

    if (pickup.lat == null || pickup.lng == null || drop.lat == null || drop.lng == null) {
      setError("Invalid pickup or drop location. Please select again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await api.post(
        "/api/rides/book",
        null,
        {
          params: {
            pickupLat: Number(pickup.lat),
            pickupLng: Number(pickup.lng),
            dropLat: Number(drop.lat),
            dropLng: Number(drop.lng),
            userId
          }
        }
      );

      setRideResponse(res.data);

      if (typeof res.data === "string" && res.data.toLowerCase().includes("driver")) {
        setError("Driver not found. Try again later.");
        return;
      }

      if (res.data?.rideId) {
        onRideBooked?.(res.data.rideId);
        setSuccess("Ride booked successfully!");
        handleClear();
        return;
      }

      setError("Failed to book ride.");
    } catch {
      setError("Failed to book ride.");
      onRideBooked?.(null);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceName = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      return data.display_name || "Unknown location";
    } catch {
      return "Unknown location";
    }
  };

  /* ================= STYLES ================= */
  const cardStyle = {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
    transition: "all 0.3s ease",
  };

  const confirmBtnStyle = {
    ...buttonStyle,
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    color: "#fff",
  };

  const clearBtnStyle = {
    ...buttonStyle,
    backgroundColor: "#555",
    color: "#fff",
  };

  return (
    <div style={{ ...cardStyle }}>
      <h2 style={{ marginBottom: "15px", color: "#00c6ff" }}>🚖 Book a Ride</h2>

      <MapPicker
        pickup={pickup}
        drop={drop}
        onSelect={handleSelect}
        onClear={handleClear}
      />

      <div style={{ marginTop: "15px", fontSize: "15px" }}>
        <p><strong>Pickup:</strong> <span style={{ color: "#00ffab" }}>{pickupName || "Not selected"}</span></p>
        <p><strong>Drop:</strong> <span style={{ color: "#ff6b6b" }}>{dropName || "Not selected"}</span></p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          style={confirmBtnStyle}
          onClick={() => { if(confirm("Do you want to confirm ride?")) bookRide(); }}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Ride"}
        </button>
        <button style={clearBtnStyle} onClick={handleClear} disabled={loading}>
          Clear
        </button>
      </div>

      {error && <p style={{ marginTop: "10px", color: "#ff4b5c" }}>{error}</p>}
      {success && <p style={{ marginTop: "10px", color: "#00ffab" }}>{success}</p>}

      {rideResponse?.rideId && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#2c2c2e", borderRadius: "10px" }}>
          <h3 style={{ color: "#00c6ff" }}>Ride Details</h3>
          <p><b>Ride ID:</b> {rideResponse.rideId}</p>
          <p><b>Status:</b> {rideResponse.status}</p>
          <p><b>Distance:</b> {rideResponse.distance.toFixed(2)} km</p>
          <p><b>Fare:</b> ₹{rideResponse.fare.toFixed(2)}</p>
          <p><b>Payment:</b> {rideResponse.paymentStatus}</p>

          <hr style={{ borderColor: "#444" }} />

          <h3 style={{ color: "#00c6ff" }}>Driver Assigned</h3>
          <p><b>Name:</b> {rideResponse.driver.name}</p>
          <p><b>Phone:</b> {rideResponse.driver.phone}</p>
          <p><b>Vehicle:</b> {rideResponse.driver.vehicleNumber}</p>
          <p><b>Rating:</b> ⭐ {rideResponse.driver.averageRating}</p>
        </div>
      )}
    </div>
  );
};

export default BookRide;









// import { useState } from "react";
// import api from "../../../api/api";
// import MapPicker from "../../../components/MapPicker";

// const BookRide = ({ userId, onRideBooked }) => {
//   const [pickup, setPickup] = useState(null);
//   const [drop, setDrop] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [pickupName, setPickupName] = useState("");
//   const [dropName, setDropName] = useState("");
//   const [rideResponse, setRideResponse] = useState(null); // already present

//   const handleSelect = async (type, latlng) => {
//     const place = await getPlaceName(latlng.lat, latlng.lng);

//     if (type === "pickup") {
//       setPickup(latlng);
//       setPickupName(place);
//     } else if (type === "drop") {
//       setDrop(latlng);
//       setDropName(place);
//     }
//   };

//   const handleClear = () => {
//     setPickup(null);
//     setDrop(null);
//     setPickupName("");
//     setDropName("");
//     setError("");
//     setSuccess("");
//   };

//   const bookRide = async () => {
//     if (!pickup || !drop) {
//       setError("Please select pickup and drop location");
//       return;
//     }

//     if (
//       pickup.lat == null ||
//       pickup.lng == null ||
//       drop.lat == null ||
//       drop.lng == null
//     ) {
//       setError("Invalid pickup or drop location. Please select again.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const res = await api.post(
//         "/api/rides/book",
//         null,
//         {
//           params: {
//             pickupLat: Number(pickup.lat),
//             pickupLng: Number(pickup.lng),
//             dropLat: Number(drop.lat),
//             dropLng: Number(drop.lng),
//             userId: userId
//           }
//         }
//       );
//       onRideBooked?.(res.data?.rideId ?? null);


//       // 🔹 ADDITION: store raw server response
//       setRideResponse(res.data);

//       // 🔹 ADDITION: response-based handling
//       if (typeof res.data === "string") {
//         if (res.data.toLowerCase().includes("driver")) {
//           setError("Driver not found. Try after some time.");
//           return;
//         }
//       }

//       if (res.data && res.data.rideId) {
//         if (onRideBooked) {
//           onRideBooked(res.data.rideId);
//         }
//         setSuccess("Ride booked successfully");
//         handleClear();
//         return;
//       }

//       // 🔹 ADDITION: fallback
//       setError("Failed to book ride");
//     } catch (err) {
//       setError("Failed to book ride");
//       onRideBooked?.(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPlaceName = async (lat, lng) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const data = await res.json();
//       return data.display_name || "Unknown location";
//     } catch {
//       return "Unknown location";
//     }
//   };

//   return (
//     <div className="book-ride">
//       <h3>Book a Ride</h3>

//       <MapPicker
//         pickup={pickup}
//         drop={drop}
//         onSelect={handleSelect}
//         onClear={handleClear}
//       />

//       <div style={{ marginTop: "10px" }}>
//         <p><strong>Pickup:</strong> {pickupName || "Not selected"}</p>
//         <p><strong>Drop:</strong> {dropName || "Not selected"}</p>
//       </div>

//       <div style={{ marginTop: "10px" }}>
//        <button
//         onClick={() => {
//             if (confirm("Do you want to Confirm ride??")) {
//             bookRide();
//             }
//         }}
//         disabled={loading}
//         style={{ marginRight: "10px" }}
//         >
//         {loading ? "Booking..." : "Book Ride"}
//         </button>

//         <button onClick={handleClear} disabled={loading}>
//           Clear Selection
//         </button>
//       </div>

//       {/* EXISTING MESSAGES */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       {/* 🔹 ADDITION: DEBUG / SERVER RESPONSE (OPTIONAL, SAFE)
//       {rideResponse && (
//         <div style={{ marginTop: "10px", fontSize: "13px", color: "#555" }}>
//           <strong>Server response:</strong>
//           <pre>{JSON.stringify(rideResponse, null, 2)}</pre>
//         </div>
//       )} */}
//       {/* ================= RIDE DETAILS ================= */}
//       {rideResponse && rideResponse.rideId && (
//         <div
//           style={{
//             marginTop: "15px",
//             padding: "12px",
//             border: "1px solid #ccc",
//             borderRadius: "6px",
//           }}
//         >
//           <h4>Ride Details</h4>

//           <p><b>Ride ID:</b> {rideResponse.rideId}</p>
//           <p><b>Status:</b> {rideResponse.status}</p>
//           <p><b>Distance:</b> {rideResponse.distance.toFixed(2)} km</p>
//           <p><b>Fare:</b> ₹{rideResponse.fare.toFixed(2)}</p>
//           <p><b>Payment:</b> {rideResponse.paymentStatus}</p>

//           <hr />

//           <h4>Driver Assigned</h4>
//           <p><b>Name:</b> {rideResponse.driver.name}</p>
//           <p><b>Phone:</b> {rideResponse.driver.phone}</p>
//           <p><b>Vehicle No:</b> {rideResponse.driver.vehicleNumber}</p>
//           <p><b>Rating:</b> ⭐ {rideResponse.driver.averageRating}</p>
//         </div>
//       )}

//     </div>
//   );
// };

// export default BookRide;


import { useEffect, useState } from "react";
import api from "../../../api/api";

const Review = ({ userId }) => {
  const [rides, setRides] = useState([]);
  const [selectedRideId, setSelectedRideId] = useState("");
  const [showReviewBox, setShowReviewBox] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Load user rides
  useEffect(() => {
    if (!userId) return;
    const loadRides = async () => {
      try {
        const res = await api.get(`/api/rides/user/${userId}`);
        setRides(res.data || []);
      } catch {
        setError("Failed to load rides");
      }
    };
    loadRides();
  }, [userId]);

  // 🔹 Submit review
  const submitReview = async () => {
    if (!selectedRideId) return setError("Please select a ride");
    if (rating === 0) return setError("Please select star rating");

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await api.post("/api/reviews/add", null, {
        params: { rideId: selectedRideId, rating, comment: comment || null },
      });
      setSuccess("Review submitted successfully");
      setShowReviewBox(false);
      setRating(0);
      setComment("");
    } catch {
      setError("Maximum 1 review allowed for this ride");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return null;

  const cardStyle = {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#00c6ff",
    color: "#000",
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ color: "#00c6ff" }}>Give Review</h3>

      {/* Select Ride */}
      <div style={{ marginBottom: "15px" }}>
        <label><strong>Select Ride:</strong></label>
        <br />
        <select
          value={selectedRideId}
          onChange={(e) => {
            setSelectedRideId(e.target.value);
            setShowReviewBox(false);
            setError("");
            setSuccess("");
          }}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "#333",
            color: "#fff",
            border: "1px solid #444",
            marginTop: "5px",
          }}
        >
          <option value="">-- Select Ride ID --</option>
          {rides.map((ride) => (
            <option key={ride.rideId} value={ride.rideId}>
              Ride #{ride.rideId} ({ride.status})
            </option>
          ))}
        </select>
      </div>

      {/* Show Review Button */}
      {selectedRideId && !showReviewBox && (
        <button style={buttonStyle} onClick={() => setShowReviewBox(true)}>
          Give Review
        </button>
      )}

      {/* Review Box */}
      {showReviewBox && (
        <div style={{ marginTop: "15px" }}>
          <h4>Rate Ride #{selectedRideId}</h4>

          {/* Star Rating */}
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  color: star <= rating ? "#f5c518" : "#555",
                  marginRight: "4px",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment */}
          <textarea
            placeholder="Write a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "#333",
              color: "#fff",
              border: "1px solid #444",
              marginBottom: "10px",
            }}
          />

          {/* Action Buttons */}
          <button
            style={buttonStyle}
            onClick={submitReview}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#444", color: "#fff", marginLeft: "10px" }}
            onClick={() => setShowReviewBox(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Messages */}
      {error && <p style={{ color: "#dc3545", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "#28a745", marginTop: "10px" }}>{success}</p>}
    </div>
  );
};

export default Review;




// import { useEffect, useState } from "react";
// import api from "../../../api/api";

// const Review = ({ userId }) => {
//   const [rides, setRides] = useState([]);
//   const [selectedRideId, setSelectedRideId] = useState("");
//   const [showReviewBox, setShowReviewBox] = useState(false);

//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 🔹 Load user rides
//   useEffect(() => {
//     if (!userId) return;

//     const loadRides = async () => {
//       try {
//         const res = await api.get(`/api/rides/user/${userId}`);
//         setRides(res.data || []);
//       } catch {
//         setError("Failed to load rides");
//       }
//     };

//     loadRides();
//   }, [userId]);

//   // 🔹 Submit review
//   const submitReview = async () => {
//     if (!selectedRideId) {
//       setError("Please select a ride");
//       return;
//     }

//     if (rating === 0) {
//       setError("Please select star rating");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       await api.post("/api/reviews/add", null, {
//         params: {
//           rideId: selectedRideId,
//           rating,
//           comment: comment || null,
//         },
//       });

//       setSuccess("Review submitted successfully");
//       setShowReviewBox(false);
//       setRating(0);
//       setComment("");
//     } catch {
//       setError("Maximum 1 review allowed for this ride");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userId) return null;

//   return (
//     <div className="review">
//       <h3>Give Review</h3>

//       {/* 🚕 SELECT RIDE */}
//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Select Ride:</strong></label>
//         <br />
//         <select
//           value={selectedRideId}
//           onChange={(e) => {
//             setSelectedRideId(e.target.value);
//             setShowReviewBox(false);
//             setError("");
//             setSuccess("");
//           }}
//         >
//           <option value="">-- Select Ride ID --</option>
//           {rides.map((ride) => (
//             <option key={ride.rideId} value={ride.rideId}>
//               Ride #{ride.rideId} ({ride.status})
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 🔘 GIVE REVIEW BUTTON */}
//       {selectedRideId && !showReviewBox && (
//         <button onClick={() => setShowReviewBox(true)}>
//           Give Review
//         </button>
//       )}

//       {/* ⭐ REVIEW BOX */}
//       {showReviewBox && (
//         <div style={{ marginTop: "10px" }}>
//           <h4>Rate Ride #{selectedRideId}</h4>

//           {/* STAR RATING */}
//           <div style={{ fontSize: "24px", marginBottom: "10px" }}>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 onClick={() => setRating(star)}
//                 style={{
//                   cursor: "pointer",
//                   color: star <= rating ? "#f5c518" : "#ccc",
//                 }}
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           {/* COMMENT */}
//           <textarea
//             placeholder="Write a comment (optional)"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={3}
//             style={{ width: "100%", marginBottom: "10px" }}
//           />

//           {/* ACTIONS */}
//           <button onClick={submitReview} disabled={loading}>
//             {loading ? "Submitting..." : "Submit Review"}
//           </button>

//           <button
//             onClick={() => setShowReviewBox(false)}
//             style={{ marginLeft: "10px" }}
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* 🔔 MESSAGES */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}
//     </div>
//   );
// };

// export default Review;

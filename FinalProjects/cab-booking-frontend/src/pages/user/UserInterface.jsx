import { useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./panels/UserProfile";
import BookRide from "./panels/BookRide";
import DriverAllotted from "./panels/DriverAllotted";
import CurrentRide from "./panels/CurrentRide";
import Payment from "./panels/Payment";
import Review from "./panels/Review";
import RideHistory from "./panels/RideHistory";

const UserInterface = () => {
  const { userId } = useParams();

  // state
  const [rideId, setRideId] = useState(undefined);
  const [showDriver, setShowDriver] = useState(false);
  const [viewReview, setViewReview] = useState(false);

  return (
    <div
      className="user-interface"
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "#eee",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      {/* User Profile */}
      <UserProfile userId={userId} />

      {/* Header */}
      <header
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderBottom: "1px solid #333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#ffcc00" }}>User Dashboard</h3>
        <small style={{ color: "#aaa" }}>User ID: {userId}</small>
      </header>

      {/* Main Content */}
      <main
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* Book Ride */}
        <section style={cardStyle}>
          <h4 style={sectionHeaderStyle}>Book a Ride</h4>
          <BookRide
            userId={userId}
            onRideBooked={(id) => {
              setRideId(id);
              setShowDriver(true);
            }}
          />
        </section>

        {/* Driver Allotted */}
        {showDriver && (
          <section style={cardStyle}>
            <h4 style={sectionHeaderStyle}>Driver Details</h4>
            <DriverAllotted rideId={rideId} />
          </section>
        )}

        {/* Current Ride */}
        <section style={cardStyle}>
          <h4 style={sectionHeaderStyle}>Current Ride</h4>
          <CurrentRide userId={userId} />
        </section>

        {/* Payment */}
        <section style={cardStyle}>
          <h4 style={sectionHeaderStyle}>Payments</h4>
          <Payment userId={userId} />
        </section>

        {/* Ride History */}
        <section style={cardStyle}>
          <h4 style={sectionHeaderStyle}>Ride History</h4>
          <RideHistory userId={userId} />
        </section>

        {/* Review */}
        <section style={cardStyle}>
          <h4 style={sectionHeaderStyle}>Give a Review</h4>
          {!viewReview && (
            <button
              onClick={() => setViewReview(true)}
              style={buttonStyle}
            >
              Give Review
            </button>
          )}
          {viewReview && <Review userId={userId} />}
        </section>
      </main>
    </div>
  );
};

/* Styles */
const cardStyle = {
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
};

const sectionHeaderStyle = {
  marginBottom: "15px",
  color: "#ffcc00",
};

const buttonStyle = {
  background: "#ffcc00",
  color: "#121212",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};

export default UserInterface;











// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import UserProfile from "./panels/UserProfile";
// import BookRide from "./panels/BookRide";
// import DriverAllotted from "./panels/DriverAllotted";
// import CurrentRide from "./panels/CurrentRide";
// import Payment from "./panels/Payment";
// import Review from "./panels/Review";
// import RideHistory from "./panels/RideHistory";

// // child components (EMPTY or SIMPLE for now)
// // import BookRide from "./BookRide";
// // import ActiveRide from "./ActiveRide";
// // import Payment from "./Payment";
// // import Review from "./Review";
// // import RideHistory from "./RideHistory";

// const UserInterface = () => {
//   const { userId } = useParams();

//   // what user is currently doing
//   const [view, setView] = useState("BOOK"); 
//   // BOOK | ACTIVE | PAYMENT | REVIEW | HISTORY
//   const [activeRideId, setActiveRideId] = useState(null);
//   const [rideId, setRideId] = useState(undefined);
//   const [showDriver, setShowDriver] = useState(false);
//   const [viewReview, setViewReview] = useState("");
//   const [showTracking, setShowTracking] = useState(false);



//   return (
//     <div className="user-interface">
//       <UserProfile userId={userId} />
//       <header style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
//         <h3>User Interface</h3>
//         <small>User ID: {userId}</small>
//       </header>

//       <main style={{ padding: "15px" }}>
//         <BookRide userId={userId}onRideBooked={(id) => {setRideId(id); setShowDriver(true); }}/>
//         <hr size="10"></hr>
//         {showDriver && <DriverAllotted rideId={rideId} />}

//         <hr size="10"></hr>

//         <CurrentRide userId={userId} />
//         <hr size="10"></hr>

//         <Payment userId={userId} />
//         <hr size="10"></hr>

//         <RideHistory userId={userId} />
//         <hr size="10"></hr>

//         <button onClick={() => setViewReview("REVIEW")}>Give Review</button>
//         {viewReview === "REVIEW" && <Review userId={userId} />}
//         <hr size="10"></hr>
        
//       </main>
//     </div>
//   );
// };

// export default UserInterface;

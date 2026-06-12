import React from "react";

const LiveTrackingDriver = ({ ride }) => {
  if (!ride || !ride.rideId) return null;

  // show only for active rides
  if (ride.status !== "REQUESTED" && ride.status !== "STARTED") {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4>Driver Tracking</h4>

      <p>
        <b>Status:</b>{" "}
        {ride.status === "REQUESTED"
          ? "Driver assigned, on the way"
          : "Ride in progress"}
      </p>

      <p><b>Driver Name:</b> {ride.driver.name}</p>
      <p><b>Phone:</b> {ride.driver.phone}</p>
      <p><b>Vehicle No:</b> {ride.driver.vehicleNumber}</p>

      <p style={{ marginTop: "10px", color: "#666", fontSize: "13px" }}>
        📍 Live map tracking will be enabled soon
      </p>
    </div>
  );
};

export default LiveTrackingDriver;

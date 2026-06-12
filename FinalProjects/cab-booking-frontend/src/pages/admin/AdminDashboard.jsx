import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rides, setRides] = useState([]);
  const [payments, setPayments] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [completedTrips, setCompletedTrips] = useState(0);

  const [showUsers, setShowUsers] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showCompletedRides, setShowCompletedRides] = useState(false);
  const [showTopDrivers, setShowTopDrivers] = useState(false);

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  // Fetch data
  const fetchAdminData = async () => {
    try {
      const [u, d, r, p] = await Promise.all([
        axios.get("http://localhost:8080/api/admin/users"),
        axios.get("http://localhost:8080/api/admin/drivers"),
        axios.get("http://localhost:8080/api/admin/rides"),
        axios.get("http://localhost:8080/api/admin/payments"),
      ]);
      setUsers(u.data);
      setDrivers(d.data);
      setRides(r.data);
      setPayments(p.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  const fetchReports = async () => {
    try {
      const [rev, trips, completed] = await Promise.all([
        axios.get("http://localhost:8080/api/admin/reports/revenue"),
        axios.get("http://localhost:8080/api/admin/reports/trips/total"),
        axios.get("http://localhost:8080/api/admin/reports/trips/completed"),
      ]);
      setTotalRevenue(rev.data.totalRevenue);
      setTotalTrips(trips.data);
      setCompletedTrips(completed.data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetchReports();
  }, []);

  const deleteUser = async (userId) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await axios.delete(`http://localhost:8080/api/users/${userId}`);
      alert(res.data.message);
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    } catch {
      alert("Failed to delete user");
    }
  };

  const deleteDriver = async (driverId) => {
    if (!confirm("Delete this driver?")) return;
    try {
      const res = await axios.delete(`http://localhost:8080/api/drivers/${driverId}`);
      alert(res.data.message);
      setDrivers((prev) => prev.filter((d) => d.driverId !== driverId));
    } catch {
      alert("Failed to delete driver");
    }
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={{ color: "#ffcc00" }}>Admin Dashboard</h1>

      {/* Summary Cards */}
      <div style={summaryStyle}>
        <Card title="Users" value={users.length} />
        <Card title="Drivers" value={drivers.length} />
        <Card title="Total Trips" value={totalTrips} />
        <Card title="Completed Trips" value={completedTrips} />
        <Card title="Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
      </div>

      {/* Controls */}
      <div style={controlsStyle}>
        <ToggleButton
          label="Users"
          state={showUsers}
          setState={setShowUsers}
        />
        <ToggleButton
          label="Drivers"
          state={showDrivers}
          setState={setShowDrivers}
        />
        <ToggleButton
          label="Rides"
          state={showRides}
          setState={setShowRides}
        />
        <ToggleButton
          label="Completed Rides"
          state={showCompletedRides}
          setState={setShowCompletedRides}
        />
        <ToggleButton
          label="Payments"
          state={showPayments}
          setState={setShowPayments}
        />
        <ToggleButton
          label="Top Drivers"
          state={showTopDrivers}
          setState={setShowTopDrivers}
        />
      </div>

      {/* Users Table */}
      {showUsers && (
        <Section title="Users">
          <Table
            headers={["ID", "Name", "Email", "Phone", "Password", "Action"]}
            data={users.map((u) => [
              u.userId,
              u.name,
              u.email,
              u.phone,
              u.password,
              <button
                style={deleteButtonStyle}
                onClick={() => deleteUser(u.userId)}
              >
                Delete
              </button>,
            ])}
          />
        </Section>
      )}

      {/* Drivers Table */}
      {showDrivers && (
        <Section title="Drivers">
          <Table
            headers={["ID", "Name", "Email", "Phone", "Vehicle", "Status", "Action"]}
            data={drivers.map((d) => [
              d.driverId,
              d.name,
              d.email,
              d.phone,
              d.vehicleNumber,
              d.isAvailable ? "ONLINE" : "OFFLINE",
              <button
                style={deleteButtonStyle}
                onClick={() => deleteDriver(d.driverId)}
              >
                Delete
              </button>,
            ])}
          />
        </Section>
      )}

      {/* Rides Table */}
      {showRides && (
        <Section title="All Rides">
          <Table
            headers={["ID", "Passenger", "Driver", "Distance", "Status", "Fare", "Payment"]}
            data={rides.map((r) => [
              r.rideId,
              r.user?.name,
              r.driver?.name,
              r.distance.toFixed(2) + " km",
              r.status,
              "₹" + Number(r.fare).toFixed(2),
              r.paymentStatus,
            ])}
          />
        </Section>
      )}

      {/* Completed Rides */}
      {showCompletedRides && (
        <Section title="Completed Rides">
          <Table
            headers={["ID", "Passenger", "Driver", "Distance", "Fare", "Payment"]}
            data={rides
              .filter((r) => r.status === "COMPLETED")
              .map((r) => [
                r.rideId,
                r.user?.name,
                r.driver?.name,
                Number(r.distance).toFixed(2),
                "₹" + Number(r.fare).toFixed(2),
                r.paymentStatus,
              ])}
          />
        </Section>
      )}

      {/* Payments Table */}
      {showPayments && (
        <Section title="Payments">
          <Table
            headers={["Payment ID", "Ride ID", "Passenger", "Amount", "Status", "Transaction"]}
            data={payments.map((p) => [
              p.paymentId,
              p.ride?.rideId,
              p.ride.user.name,
              "₹" + p.amount.toFixed(2),
              p.paymentStatus,
              p.transactionId,
            ])}
          />
        </Section>
      )}

      {/* Top Drivers */}
      {showTopDrivers && (
        <Section title="Top Drivers">
          <Table
            headers={["Driver ID", "Name", "Rating", "Total Rides"]}
            data={Object.values(
              rides
                .filter((r) => r.status === "COMPLETED")
                .reduce((acc, r) => {
                  const d = r.driver;
                  if (!d) return acc;
                  if (!acc[d.driverId])
                    acc[d.driverId] = {
                      driverId: d.driverId,
                      name: d.name,
                      averageRating: d.averageRating,
                      totalRides: 0,
                    };
                  acc[d.driverId].totalRides += 1;
                  return acc;
                }, {})
            )
              .sort((a, b) => b.totalRides - a.totalRides)
              .map((d) => [
                d.driverId,
                d.name,
                <span style={{ color: "#f5c518" }}>
                  {renderStars(d.averageRating)} ({d.averageRating})
                </span>,
                d.totalRides,
              ])}
          />
        </Section>
      )}
    </div>
  );
};

/* ================= STYLES ================= */
const dashboardStyle = {
  minHeight: "100vh",
  background: "#121212",
  color: "#eee",
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const summaryStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "20px",
};

const controlsStyle = {
  marginBottom: "20px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const deleteButtonStyle = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const Card = ({ title, value }) => (
  <div
    style={{
      background: "#1e1e1e",
      padding: "20px",
      borderRadius: "12px",
      width: "150px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    }}
  >
    <b style={{ color: "#ffcc00" }}>{title}</b>
    <h2>{value}</h2>
  </div>
);

const ToggleButton = ({ label, state, setState }) => (
  <button
    onClick={() => setState(!state)}
    style={{
      background: state ? "#ffcc00" : "#333",
      color: state ? "#121212" : "#eee",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    }}
  >
    {state ? `Hide ${label}` : `View ${label}`}
  </button>
);

const Section = ({ title, children }) => (
  <div
    style={{
      marginBottom: "30px",
      background: "#1e1e1e",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    }}
  >
    <h3 style={{ color: "#ffcc00", marginBottom: "15px" }}>{title}</h3>
    {children}
  </div>
);

const Table = ({ headers, data }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        {headers.map((h, idx) => (
          <th
            key={idx}
            style={{
              padding: "10px",
              textAlign: "left",
              borderBottom: "2px solid #555",
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr
          key={idx}
          style={{
            borderBottom: "1px solid #333",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2a2a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {row.map((cell, cidx) => (
            <td key={cidx} style={{ padding: "8px" }}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [rides, setRides] = useState([]);
//   const [payments, setPayments] = useState([]);

//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalTrips, setTotalTrips] = useState(0);
//   const [completedTrips, setCompletedTrips] = useState(0);
//   const [topDrivers, setTopDrivers] = useState([]);

//   const [showUsers, setShowUsers] = useState(false);
//   const [showDrivers, setShowDrivers] = useState(false);
//   const [showRides, setShowRides] = useState(false);
//   const [showPayments, setShowPayments] = useState(false);
//   const [showCompletedRides, setShowCompletedRides] = useState(false);
//   const [showTopDrivers, setShowTopDrivers] = useState(false);



//   const renderStars = (rating) => {
//     const fullStars = Math.round(rating);
//     return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
//   };

//   /* ================= FETCH ALL ADMIN DATA ================= */

//   const fetchAdminData = async () => {
//     try {
//       const [u, d, r, p] = await Promise.all([
//         axios.get("http://localhost:8080/api/admin/users"),
//         axios.get("http://localhost:8080/api/admin/drivers"),
//         axios.get("http://localhost:8080/api/admin/rides"),
//         axios.get("http://localhost:8080/api/admin/payments"),
//       ]);

//       setUsers(u.data);
//       setDrivers(d.data);
//       setRides(r.data);
//       setPayments(p.data);
//     } catch (err) {
//       console.error("Failed to load admin data", err);
//     }
//   };

//   /* ================= FETCH REPORTS ================= */

//   const fetchReports = async () => {
//     try {
//       const [rev, trips, completed, top] = await Promise.all([
//         axios.get("http://localhost:8080/api/admin/reports/revenue"),
//         axios.get("http://localhost:8080/api/admin/reports/trips/total"),
//         axios.get("http://localhost:8080/api/admin/reports/trips/completed"),
//         axios.get("http://localhost:8080/api/admin/reports/drivers/top"),
//       ]);

//       setTotalRevenue(rev.data.totalRevenue);
//       setTotalTrips(trips.data);
//       setCompletedTrips(completed.data);
//       setTopDrivers(top.data);
//     } catch (err) {
//       console.error("Failed to load reports", err);
//     }
//   };

//   useEffect(() => {
//     fetchAdminData();
//     fetchReports();
//   }, []);

//   /* ================= DELETE USER ================= */

//   const deleteUser = async (userId) => {
//     if (!confirm("Delete this user?")) return;

//     try {
//       const res = await axios.delete(
//         `http://localhost:8080/api/users/${userId}`
//       );
//       alert(res.data.message);
//       setUsers((prev) => prev.filter((u) => u.userId !== userId));
//     } catch {
//       alert("Failed to delete user");
//     }
//   };

//   /* ================= DELETE DRIVER ================= */

//   const deleteDriver = async (driverId) => {
//     if (!confirm("Delete this driver?")) return;

//     try {
//       const res = await axios.delete(
//         `http://localhost:8080/api/drivers/${driverId}`
//       );
//       alert(res.data.message);
//       setDrivers((prev) => prev.filter((d) => d.driverId !== driverId));
//     } catch {
//       alert("Failed to delete driver");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>

//       {/* ================= SUMMARY ================= */}
//       <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
//         <Card title="Users" value={users.length} />
//         <Card title="Drivers" value={drivers.length} />
//         <Card title="Total Trips" value={totalTrips} />
//         <Card title="Completed Trips" value={completedTrips} />
//         <Card title="Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
//       </div>

//       {/* ================= VIEW CONTROLS ================= */}
//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={() => setShowUsers(!showUsers)}>
//           {showUsers ? "Hide Users" : "View Users"}
//         </button>

//         <button onClick={() => setShowDrivers(!showDrivers)} style={{ marginLeft: 10 }}>
//           {showDrivers ? "Hide Drivers" : "View Drivers"}
//         </button>

//         <button onClick={() => setShowRides(!showRides)} style={{ marginLeft: 10 }}>
//           {showRides ? "Hide Rides" : "View Rides"}
//         </button>

//         <button onClick={() => setShowPayments(!showPayments)} style={{ marginLeft: 10 }}>
//           {showPayments ? "Hide Payments" : "View Payments"}
//         </button>

//         <button
//           onClick={() => setShowCompletedRides(!showCompletedRides)}
//           style={{ marginLeft: "10px" }}
//         >
//           {showCompletedRides ? "Hide Completed Rides" : "View Completed Rides"}
//         </button>

//         <button
//           onClick={() => setShowTopDrivers(!showTopDrivers)}
//           style={{ marginLeft: "10px" }}
//         >
//           {showTopDrivers ? "Hide Top Drivers" : "View Top Drivers"}
//         </button>


//       </div>

//       {/* ================= USERS ================= */}
//       {showUsers && (
//         <>
//           <h3>Users</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Password</th><th>Remove User</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.userId}>
//                   <td>{u.userId}</td>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>{u.phone}</td>
//                   <td>{u.password}</td>
//                   <td>
//                     <button
//                       onClick={() => deleteUser(u.userId)}
//                       style={{ background: "#dc3545", color: "white", border: "none" }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* ================= DRIVERS ================= */}
//       {showDrivers && (
//         <>
//           <h3>Drivers</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
//                 <th>Vehicle</th><th>Status</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drivers.map((d) => (
//                 <tr key={d.driverId}>
//                   <td>{d.driverId}</td>
//                   <td>{d.name}</td>
//                   <td>{d.email}</td>
//                   <td>{d.phone}</td>
//                   <td>{d.vehicleNumber}</td>
//                   <td>{d.isAvailable ? "ONLINE" : "OFFLINE"}</td>
//                   <td>
//                     <button
//                       onClick={() => deleteDriver(d.driverId)}
//                       style={{ background: "#dc3545", color: "white", border: "none" }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* ================= RIDES ================= */}
//       {showRides && (
//         <>
//           <h3>All Rides</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th><th>Passenger</th><th>Driver</th><th>Distance</th><th>Ride Status</th><th>Fare</th><th>Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rides.map((r) => (
//                 <tr key={r.rideId}>
//                   <td>{r.rideId}</td>
//                   <td>{r.user?.name}</td>
//                   <td>{r.driver?.name}</td>
//                   <td>{r.distance.toFixed(2)} km</td>
//                   <td>{r.status}</td>
//                   <td>₹{Number(r.fare).toFixed(2)}</td>
//                   <td>{r.paymentStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}


//       {/* ================= COMPLETED RIDES ================= */}
//       {showCompletedRides && (
//         <>
//           <h3>Completed Rides</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Passenger</th>
//                 <th>Driver</th>
//                 <th>Distance (km)</th>
//                 <th>Fare (₹)</th>
//                 <th>Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rides
//                 .filter((r) => r.status === "COMPLETED")
//                 .map((r) => (
//                   <tr key={r.rideId}>
//                     <td>{r.rideId}</td>
//                     <td>{r.user?.name}</td>
//                     <td>{r.driver?.name}</td>
//                     <td>{Number(r.distance).toFixed(2)}</td>
//                     <td>₹{Number(r.fare).toFixed(2)}</td>
//                     <td>{r.paymentStatus}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </>
//       )}

//         {/* ================= TOP DRIVERS ================= */}
//         {showTopDrivers && (
//           <>
//             <h3>Top Drivers (by Completed Rides)</h3>

//             <table border="1" cellPadding="8" width="100%">
//               <thead>
//                 <tr>
//                   <th>Driver ID</th>
//                   <th>Name</th>
//                   <th>Average Rating</th>
//                   <th>Total Rides</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.values(
//                   rides
//                     .filter((r) => r.status === "COMPLETED")
//                     .reduce((acc, r) => {
//                       const d = r.driver;
//                       if (!d) return acc;

//                       if (!acc[d.driverId]) {
//                         acc[d.driverId] = {
//                           driverId: d.driverId,
//                           name: d.name,
//                           averageRating: d.averageRating,
//                           totalRides: 0,
//                         };
//                       }

//                       acc[d.driverId].totalRides += 1;
//                       return acc;
//                     }, {})
//                 )
//                   .sort((a, b) => b.totalRides - a.totalRides)
//                   .map((d) => (
//                     <tr key={d.driverId}>
//                       <td>{d.driverId}</td>
//                       <td>{d.name}</td>
//                       <td>
//                         <span style={{ color: "#f5c518", fontSize: "16px" }}>
//                           {renderStars(d.averageRating)}
//                         </span>
//                         <span style={{ marginLeft: "6px", color: "#555" }}>
//                           ({d.averageRating})
//                         </span>
//                       </td>
//                       <td>{d.totalRides}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </>
//         )}


      

//       {/* ================= PAYMENTS ================= */}
//       {showPayments && (
//         <>
//           <h3>Payments</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>Payment ID</th><th>Ride ID</th><th>Passenger</th><th>Amount</th><th>Payment Status</th><th>Transaction Id</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((p) => (
//                 <tr key={p.paymentId}>
//                   <td>{p.paymentId}</td>
//                   <td>{p.ride?.rideId}</td>
//                   <td>{p.ride.user.name}</td>
//                   <td>₹{p.amount.toFixed(2)}</td>
//                   <td>{p.paymentStatus}</td>
//                   <td>{p.transactionId}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

      

//     </div>
//   );
// };

// /* ================= CARD ================= */

// const Card = ({ title, value }) => (
//   <div
//     style={{
//       border: "1px solid #aaa",
//       padding: "15px",
//       width: "160px",
//       textAlign: "center",
//     }}
//   >
//     <b>{title}</b>
//     <h3>{value}</h3>
//   </div>
// );

// export default AdminDashboard;







// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [rides, setRides] = useState([]);
//   const [payments, setPayments] = useState([]);

//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalTrips, setTotalTrips] = useState(0);
//   const [completedTrips, setCompletedTrips] = useState(0);
//   const [topDrivers, setTopDrivers] = useState([]);

//   const [showUsers, setShowUsers] = useState(false);
//   const [showDrivers, setShowDrivers] = useState(false);

//   /* ================= FETCH BASIC DATA ================= */

//   const fetchAdminData = async () => {
//     try {
//       const [u, d, r, p] = await Promise.all([
//         axios.get("http://localhost:8080/api/admin/users"),
//         axios.get("http://localhost:8080/api/admin/drivers"),
//         axios.get("http://localhost:8080/api/admin/rides"),
//         axios.get("http://localhost:8080/api/admin/payments"),
//       ]);

//       setUsers(u.data);
//       setDrivers(d.data);
//       setRides(r.data);
//       setPayments(p.data);
//     } catch (err) {
//       console.error("Failed to load admin data", err);
//     }
//   };

//   /* ================= FETCH REPORTS ================= */

//   const fetchReports = async () => {
//     try {
//       const [rev, trips, completed, top] = await Promise.all([
//         axios.get("http://localhost:8080/api/admin/reports/revenue"),
//         axios.get("http://localhost:8080/api/admin/reports/trips/total"),
//         axios.get("http://localhost:8080/api/admin/reports/trips/completed"),
//         axios.get("http://localhost:8080/api/admin/reports/drivers/top"),
//       ]);

//       setTotalRevenue(rev.data.totalRevenue);
//       setTotalTrips(trips.data);
//       setCompletedTrips(completed.data);
//       setTopDrivers(top.data);
//     } catch (err) {
//       console.error("Failed to load reports", err);
//     }
//   };

//   useEffect(() => {
//     fetchAdminData();
//     fetchReports();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>

//       {/* ================= SUMMARY CARDS ================= */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <Card title="Users" value={users.length} />
//         <Card title="Drivers" value={drivers.length} />
//         <Card title="Total Trips" value={totalTrips} />
//         <Card title="Completed Trips" value={completedTrips} />
//         <Card title="Revenue" value={`₹${totalRevenue}`} />
//       </div>

//       {/* ================= VIEW BUTTONS ================= */}
//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={() => setShowUsers(!showUsers)}>
//           {showUsers ? "Hide Users" : "View Users"}
//         </button>

//         <button
//           onClick={() => setShowDrivers(!showDrivers)}
//           style={{ marginLeft: "10px" }}
//         >
//           {showDrivers ? "Hide Drivers" : "View Drivers"}
//         </button>
//       </div>

//       {/* ================= USERS TABLE ================= */}
//       {showUsers && (
//         <>
//           <h3>All Users</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.userId}>
//                   <td>{u.userId}</td>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>{u.phone}</td>
//                   <td>{u.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* ================= DRIVERS TABLE ================= */}
//       {showDrivers && (
//         <>
//           <h3>All Drivers</h3>
//           <table border="1" cellPadding="8" width="100%">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Vehicle</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drivers.map((d) => (
//                 <tr key={d.driverId}>
//                   <td>{d.driverId}</td>
//                   <td>{d.name}</td>
//                   <td>{d.email}</td>
//                   <td>{d.phone}</td>
//                   <td>{d.vehicleNumber}</td>
//                   <td>{d.isAvailable ? "ONLINE" : "OFFLINE"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* ================= TOP DRIVERS ================= */}
//       <h3>Top Drivers</h3>
//       {topDrivers.length === 0 && <p>No data</p>}
//       {topDrivers.map((d, i) => (
//         <p key={i}>
//           {d.driverName ?? `Driver ${d.driverId}`} | Trips: {d.totalTrips}
//         </p>
//       ))}

//       {/* ================= ALL RIDES ================= */}
//       <h3>All Rides</h3>
//       <table border="1" cellPadding="8" width="100%">
//         <thead>
//           <tr>
//             <th>Ride ID</th>
//             <th>User</th>
//             <th>Driver</th>
//             <th>Status</th>
//             <th>Fare</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rides.map((r) => (
//             <tr key={r.rideId}>
//               <td>{r.rideId}</td>
//               <td>{r.user?.name}</td>
//               <td>{r.driver?.name}</td>
//               <td>{r.status}</td>
//               <td>₹{Number(r.fare).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ================= PAYMENTS ================= */}
//       <h3>Payments</h3>
//       <table border="1" cellPadding="8" width="100%">
//         <thead>
//           <tr>
//             <th>Payment ID</th>
//             <th>Ride ID</th>
//             <th>Amount</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((p) => (
//             <tr key={p.paymentId}>
//               <td>{p.paymentId}</td>
//               <td>{p.ride?.rideId}</td>
//               <td>₹{p.amount}</td>
//               <td>{p.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// /* ================= CARD ================= */

// const Card = ({ title, value }) => (
//   <div
//     style={{
//       border: "1px solid #aaa",
//       padding: "15px",
//       width: "160px",
//       textAlign: "center",
//     }}
//   >
//     <b>{title}</b>
//     <h3>{value}</h3>
//   </div>
// );

// export default AdminDashboard;

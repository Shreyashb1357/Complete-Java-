import { useEffect, useState } from "react";
import api from "../../../api/api";
import jsPDF from "jspdf";

const Payment = ({ userId }) => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [view, setView] = useState(""); // PENDING | HISTORY

  const cardStyle = {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  };

  const buttonStyle = (active) => ({
    marginRight: "10px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: active ? "#00c6ff" : "#333",
    color: active ? "#000" : "#fff",
  });

  const thStyle = {
    border: "1px solid #444",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#2c2c2e",
    color: "#00c6ff",
  };
  const tdStyle = { border: "1px solid #444", padding: "8px", color: "#fff" };

  const loadPayments = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const [pendingRes, allRes] = await Promise.all([
        api.get(`/api/payments/user/${userId}/pending`),
        api.get(`/api/payments/user/${userId}`),
      ]);
      setPendingPayments(pendingRes.data || []);
      setAllPayments(allRes.data || []);
    } catch {
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [userId]);

  const handlePay = async (rideId) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");
      await api.put(`/api/payments/ride/${rideId}/pay`);
      setMessage("Payment successful");
      loadPayments();
    } catch {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = (payment) => {
    if (!payment) return;
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Shreyash's Cab Booking System", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Receipt", 105, 35, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment ID: ${payment.paymentId || "-"}`, 20, 60);
    doc.text(`Ride ID: ${payment.ride?.rideId || "-"}`, 20, 70);
    doc.text(`User ID: ${userId || "-"}`, 20, 80);
    doc.text(`Amount: ₹${payment.amount?.toFixed(2) || "-"}`, 20, 90);
    doc.text(`Payment Mode: ${payment.paymentMode || "-"}`, 20, 100);
    doc.text(`Status: ${payment.status || "-"}`, 20, 110);
    doc.text(`Date: ${payment.paymentTime || new Date().toLocaleString()}`, 20, 120);

    doc.setFont("helvetica", "bold");
    doc.text("Thank you for riding with us!", 105, 140, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "This is a computer-generated receipt and does not require a signature.",
      105,
      150,
      { align: "center" }
    );
    doc.save(`payment-receipt-${payment.paymentId}.pdf`);
  };

  if (!userId) return null;

  return (
    <div style={cardStyle}>
      <h3 style={{ color: "#00c6ff" }}>Payments</h3>

      <div style={{ marginBottom: "15px" }}>
        <button
          style={buttonStyle(view === "PENDING")}
          onClick={() => setView(view === "PENDING" ? "" : "PENDING")}
        >
          Pending Payments
        </button>
        <button
          style={buttonStyle(view === "HISTORY")}
          onClick={() => setView(view === "HISTORY" ? "" : "HISTORY")}
        >
          Payment History
        </button>
      </div>

      {loading && <p>Loading payments...</p>}
      {error && <p style={{ color: "#dc3545" }}>{error}</p>}
      {message && <p style={{ color: "#28a745" }}>{message}</p>}
      {!view && <p style={{ color: "#aaa" }}>Choose an option above</p>}

      {/* Pending Payments */}
      {view === "PENDING" && (
        <div>
          {pendingPayments.length === 0 ? (
            <p>No pending payments</p>
          ) : (
            pendingPayments.map((p) => (
              <div
                key={p.paymentId}
                style={{
                  border: "1px solid #444",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>Ride ID:</strong> {p.ride?.rideId}</p>
                <p><strong>Amount:</strong> ₹{p.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {p.status}</p>
                <button
                  onClick={() => handlePay(p.ride.rideId)}
                  disabled={loading}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#00c6ff",
                    color: "#000",
                    marginTop: "8px",
                  }}
                >
                  Pay Now
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Payment History */}
      {view === "HISTORY" && (
        <div style={{ overflowX: "auto" }}>
          {allPayments.length === 0 ? (
            <p>No payments found</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Payment ID</th>
                  <th style={thStyle}>Ride ID</th>
                  <th style={thStyle}>Amount (₹)</th>
                  <th style={thStyle}>Payment Mode</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Transaction Id</th>
                  <th style={thStyle}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.map((p) => (
                  <tr key={p.paymentId}>
                    <td style={tdStyle}>{p.paymentId}</td>
                    <td style={tdStyle}>{p.ride?.rideId || "-"}</td>
                    <td style={tdStyle}>{p.amount.toFixed(2)}</td>
                    <td style={tdStyle}>{p.paymentMode}</td>
                    <td style={tdStyle}>{p.paymentTime}</td>
                    <td style={tdStyle}>{p.transactionId}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => downloadReceipt(p)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: "#00c6ff",
                          color: "#000",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </td>
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

export default Payment;



// import { useEffect, useState } from "react";
// import api from "../../../api/api";
// import jsPDF from "jspdf";

// const Payment = ({ userId }) => {
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [allPayments, setAllPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const thStyle = {border: "1px solid #ddd",padding: "8px",textAlign: "left"};

//     const tdStyle = {border: "1px solid #ddd", padding: "8px"};


//   // 🔹 ADDITION: view control
//   const [view, setView] = useState(""); // PENDING | HISTORY
  

//   const loadPayments = async () => {
//     if (!userId) return;

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       const [pendingRes, allRes] = await Promise.all([
//         api.get(`/api/payments/user/${userId}/pending`),
//         api.get(`/api/payments/user/${userId}`),
//       ]);

//       setPendingPayments(pendingRes.data || []);
//       setAllPayments(allRes.data || []);
//     } catch {
//       setError("Failed to load payments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPayments();
//   }, [userId]);

//   const handlePay = async (rideId) => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       await api.put(`/api/payments/ride/${rideId}/pay`);
//       setMessage("Payment successful");

//       loadPayments();
//     } catch {
//       setError("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReceipt = (payment) => {
//     if (!payment) return;

//     const doc = new jsPDF();

//     doc.setFontSize(24);
//     doc.setFont("helvetica", "bold");
//     doc.text("Shreyash's Cab Booking System", 105, 20, { align: "center" });

//     doc.setFontSize(16);
//     doc.setFont("helvetica", "normal");
//     doc.text("Payment Receipt", 105, 35, { align: "center" });

//     doc.setLineWidth(0.5);
//     doc.line(20, 40, 190, 40);

//     // Payment Info
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Payment Details", 20, 50);

//     doc.setFont("helvetica", "normal");
//     doc.text(`Payment ID: ${payment.paymentId || "-"}`, 20, 60);
//     doc.text(`Ride ID: ${payment.ride?.rideId || "-"}`, 20, 70);
//     doc.text(`User ID: ${userId || "-"}`, 20, 80);
//     doc.text(`Amount: ₹${payment.amount?.toFixed(2) || "-"}`, 20, 90);
//     doc.text(`Payment Mode: ${payment.paymentMode || "-"}`, 20, 100);
//     doc.text(`Status: ${payment.status || "-"}`, 20, 110);
//     doc.text(`Date: ${payment.paymentTime || new Date().toLocaleString()}`, 20, 120);

//     // Footer
//     doc.setFont("helvetica", "bold");
//     doc.text("Thank you for riding with us!", 105, 140, { align: "center" });

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(
//       "This is a computer-generated receipt and does not require a signature.",
//       105,
//       150,
//       { align: "center" }
//     );

//     doc.save(`payment-receipt-${payment.paymentId}.pdf`);
//   };



//   if (!userId) return null;

//   return (
//     <div className="payment">
//       <h3>Payments</h3>


//       <div style={{ marginBottom: "15px" }}>
//         <button
//           onClick={() => setView(view === "PENDING" ? "" : "PENDING")}
//           style={{
//             marginRight: "10px",
//             background: view === "PENDING" ? "#000" : "#eee",
//             color: view === "PENDING" ? "#fff" : "#000",
//           }}
//         >
//           Pending Payments
//         </button>

//         <button
//           onClick={() => setView(view === "HISTORY" ? "" : "HISTORY")}
//           style={{
//             background: view === "HISTORY" ? "#000" : "#eee",
//             color: view === "HISTORY" ? "#fff" : "#000",
//           }}
//         >
//           Payment History
//         </button>
//       </div>

//       {loading && <p>Loading payments...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!view && (
//         <p style={{ color: "#555", marginTop: "10px" }}>
//             Choose option
//         </p>
//         )}
//       {message && <p style={{ color: "green" }}>{message}</p>}


//       {view === "PENDING" && (
//         <div>
//           <h4>Pending Payments</h4>

//           {pendingPayments.length === 0 ? (
//             <p>No pending payments</p>
//           ) : (
//             pendingPayments.map((p) => (
//               <div
//                 key={p.paymentId}
//                 style={{
//                   border: "1px solid #ddd",
//                   padding: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <p><strong>Ride ID:</strong> {p.ride?.rideId}</p>
//                 <p><strong>Amount:</strong> ₹{p.amount.toFixed(2)}</p>
//                 <p><strong>Status:</strong> {p.status}</p>

//                 <button
//                   onClick={() => handlePay(p.ride.rideId)}
//                   disabled={loading}
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {view === "HISTORY" && (
//         <div>
//           <h4>Payment History</h4>

//           {allPayments.length === 0 ? (
//             <p>No payments found</p>
//             ) : (
//             <table
//                 style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: "10px",
//                 }}
//             >
//                 <thead>
//                 <tr style={{ background: "#f5f5f5" }}>
//                     <th style={thStyle}>Payment ID</th>
//                     <th style={thStyle}>Ride ID</th>
//                     <th style={thStyle}>Amount (₹)</th>
//                     <th style={thStyle}>Payment Mode</th>
//                     <th style={thStyle}>Time</th>
//                     <th style={thStyle}>Transaction Id</th>
//                     <th style={thStyle}>Receipt</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {allPayments.map((p) => (
//                     <tr key={p.paymentId}>
//                     <td style={tdStyle}>{p.paymentId}</td>
//                     <td style={tdStyle}>{p.ride?.rideId || "-"}</td>
//                     <td style={tdStyle}>{p.amount.toFixed(2)}</td>
//                     <td style={tdStyle}>{p.paymentMode}</td>
//                     <td style={tdStyle}>{p.paymentTime}</td>
//                     <td style={tdStyle}>{p.transactionId}</td>
//                     <td style={tdStyle}>
//                         <button onClick={() => downloadReceipt(p)}>
//                         Download
//                         </button>
//                     </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;



// import { useEffect, useState } from "react";
// import api from "../../../api/api";

// const Payment = ({ userId }) => {
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [allPayments, setAllPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // 🔹 Load payments
//   const loadPayments = async () => {
//     if (!userId) return;

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       const [pendingRes, allRes] = await Promise.all([
//         api.get(`/api/payments/user/${userId}/pending`),
//         api.get(`/api/payments/user/${userId}`),
//       ]);

//       setPendingPayments(pendingRes.data || []);
//       setAllPayments(allRes.data || []);
//     } catch {
//       setError("Failed to load payments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPayments();
//   }, [userId]);

//   // 🔹 Pay for a ride
//   const handlePay = async (rideId) => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       await api.put(`/api/payments/ride/${rideId}/pay`);
//       setMessage("Payment successful");

//       loadPayments(); // refresh list
//     } catch {
//       setError("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userId) return null;

//   return (
//     <div className="payment">
//       <h3>Payments</h3>

//       {loading && <p>Loading payments...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       {/* 🔴 PENDING PAYMENTS */}
//       <div style={{ marginTop: "15px" }}>
//         <h4>Pending Payments</h4>

//         {pendingPayments.length === 0 ? (
//           <p>No pending payments</p>
//         ) : (
//           pendingPayments.map((p) => (
//             <div
//               key={p.paymentId}
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               <p><strong>Ride ID:</strong> {p.ride?.rideId}</p>
//               <p><strong>Amount:</strong> ₹{p.amount}</p>
//               <p><strong>Status:</strong> {p.status}</p>

//               <button
//                 onClick={() => handlePay(p.ride.rideId)}
//                 disabled={loading}
//               >
//                 Pay Now
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🟢 PAYMENT HISTORY */}
//       <div style={{ marginTop: "25px" }}>
//         <h4>Payment History</h4>

//         {allPayments.length === 0 ? (
//           <p>No payments found</p>
//         ) : (
//           allPayments.map((p) => (
//             <div
//               key={p.paymentId}
//               style={{
//                 borderBottom: "1px solid #eee",
//                 padding: "8px 0",
//               }}
//             >
//               <p>
//                 Ride #{p.ride?.rideId} — ₹{p.amount} —{" "}
//                 <strong>{p.status}</strong>
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;

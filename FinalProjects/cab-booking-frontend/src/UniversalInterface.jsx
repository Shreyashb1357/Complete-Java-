import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UniversalInterface = () => {
  const navigate = useNavigate();

  /* ================= ADMIN AUTH (FRONTEND ONLY) ================= */
  const ADMIN_ID = "admin";
  const ADMIN_PASSWORD = "admin@123";

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  /* ================= HERO SLIDESHOW ================= */
  const heroImages = [
    "https://images.unsplash.com/photo-1549924231-f129b911e442",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1605559424843-9c7b3b7bfa4c",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleAdminLogin = () => {
    if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={styles.page}>
      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>
        <h2>CabX</h2>
        <div style={styles.navLinks}>
          <span>About Us</span>
          <span>Contact Us</span>
          <span>Blog</span>
          <button style={styles.adminBtn} onClick={() => setShowAdminLogin(true)}>
            Admin
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        style={{
          ...styles.hero,
          backgroundImage: `url(${heroImages[currentSlide]})`,
        }}
      >
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Your Ride. Your Time.</h1>
          <p style={styles.heroSub}>
            Book trusted rides, track drivers live, and pay seamlessly.
          </p>

          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
              Login
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section style={styles.stats}>
        <Stat title="10,000+" desc="Happy Riders" />
        <Stat title="1,200+" desc="Verified Drivers" />
        <Stat title="24/7" desc="Support" />
        <Stat title="4.9★" desc="User Rating" />
      </section>

      {/* ================= FEATURES ================= */}
      <section style={styles.section}>
        <h2>Why Choose CabX?</h2>
        <div style={styles.featureGrid}>
          <Feature title="🚗 Easy Booking" desc="Book rides in just a few taps" />
          <Feature title="📍 Live Tracking" desc="Track your cab in real-time" />
          <Feature title="💳 Secure Payments" desc="Cash & online payments supported" />
          <Feature title="⭐ Ratings" desc="Rate drivers and rides" />
        </div>
      </section>

      {/* ================= BLOGS ================= */}
      <section style={styles.sectionAlt}>
        <h2>Travel Smart with CabX</h2>
        <div style={styles.blogGrid}>
          <Blog
            title="5 Tips for Safer Cab Rides"
            img="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
          />
          <Blog
            title="How We Verify Our Drivers"
            img="https://images.unsplash.com/photo-1502877338535-766e1452684a"
          />
          <Blog
            title="Cash vs Online Payments"
            img="https://images.unsplash.com/photo-1556741533-f6acd647d2fb"
          />
        </div>
      </section>

      {/* ================= ADMIN MODAL ================= */}
      {showAdminLogin && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3>Admin Login</h3>

            <input
              style={styles.input}
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "10px" }}>
              <button style={styles.primaryBtn} onClick={handleAdminLogin}>
                Login
              </button>
              <button
                style={styles.secondaryBtn}
                onClick={() => {
                  setShowAdminLogin(false);
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        © 2026 CabX | Designed & Built by Shreyash
      </footer>
    </div>
  );
};

/* ================= REUSABLE ================= */

const Feature = ({ title, desc }) => (
  <div style={styles.featureCard}>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const Stat = ({ title, desc }) => (
  <div style={styles.statCard}>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

const Blog = ({ title, img }) => (
  <div style={styles.blogCard}>
    <img src={img} alt="" style={styles.blogImg} />
    <h5>{title}</h5>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  page: { fontFamily: "Segoe UI, sans-serif", background: "#0b0b0b", color: "#fff" },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#000",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  navLinks: { display: "flex", gap: "20px", alignItems: "center" },

  hero: {
    height: "85vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out",
  },

  heroOverlay: {
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  heroTitle: { fontSize: "54px", fontWeight: "700" },
  heroSub: { maxWidth: "600px", margin: "20px 0", color: "#ccc" },

  heroButtons: { display: "flex", gap: "15px" },

  primaryBtn: {
    background: "#22c55e",
    border: "none",
    padding: "12px 26px",
    borderRadius: "30px",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "transparent",
    border: "1px solid #fff",
    padding: "12px 26px",
    borderRadius: "30px",
    color: "#fff",
  },

  stats: {
    display: "flex",
    justifyContent: "space-around",
    padding: "40px",
    background: "#111",
  },

  statCard: { textAlign: "center" },

  section: { padding: "70px 30px", textAlign: "center" },
  sectionAlt: { padding: "70px 30px", background: "#111", textAlign: "center" },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
    marginTop: "30px",
  },

  featureCard: {
    background: "#1a1a1a",
    padding: "25px",
    borderRadius: "15px",
  },

  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "25px",
    marginTop: "30px",
  },

  blogCard: {
    background: "#1a1a1a",
    borderRadius: "15px",
    overflow: "hidden",
  },

  blogImg: { width: "100%", height: "160px", objectFit: "cover" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "#fff",
    color: "#000",
    padding: "25px",
    borderRadius: "12px",
    width: "300px",
  },

  input: { width: "100%", padding: "8px", marginTop: "10px" },

  footer: {
    background: "#000",
    padding: "20px",
    textAlign: "center",
    color: "#777",
  },
};

export default UniversalInterface;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UniversalInterface = () => {
//   const navigate = useNavigate();

//   /* ================= ADMIN AUTH (FRONTEND ONLY) ================= */
//   const ADMIN_ID = "admin";
//   const ADMIN_PASSWORD = "admin@123";

//   const [showAdminLogin, setShowAdminLogin] = useState(false);
//   const [adminId, setAdminId] = useState("");
//   const [adminPassword, setAdminPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleAdminLogin = () => {
//     if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
//       navigate("/admin");
//     } else {
//       setError("Invalid admin credentials");
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif" }}>
//       {/* ================= HERO SECTION ================= */}
//       <div
//         style={{
//           background: "linear-gradient(to right, #000428, #004e92)",
//           color: "white",
//           padding: "60px 20px",
//           textAlign: "center",
//         }}
//       >
//         <h1 style={{ fontSize: "42px" }}>🚖 Cab Booking System</h1>
//         <p style={{ fontSize: "18px", marginTop: "10px" }}>
//           Book rides. Track drivers. Pay seamlessly.
//         </p>

//         <div style={{ marginTop: "30px" }}>
//           <button
//             onClick={() => navigate("/login")}
//             style={btnStyle("#28a745")}
//           >
//             Login
//           </button>

//           <button
//             onClick={() => navigate("/register")}
//             style={btnStyle("#007bff")}
//           >
//             Register
//           </button>

//           <button
//             onClick={() => setShowAdminLogin(true)}
//             style={btnStyle("#dc3545")}
//           >
//             Admin
//           </button>
//         </div>
//       </div>

//       {/* ================= FEATURES ================= */}
//       <div style={{ padding: "40px 20px", textAlign: "center" }}>
//         <h2>Why Choose Our Platform?</h2>

//         <div style={featureGrid}>
//           <Feature title="🚗 Easy Booking" desc="Book rides in just 2 clicks" />
//           <Feature title="📍 Live Driver Tracking" desc="Know where your driver is" />
//           <Feature title="💳 Secure Payments" desc="Cash & Online payments supported" />
//           <Feature title="⭐ Ratings & Reviews" desc="Rate your ride experience" />
//         </div>
//       </div>

//       {/* ================= ADMIN LOGIN MODAL ================= */}
//       {showAdminLogin && (
//         <div style={modalOverlay}>
//           <div style={modalBox}>
//             <h3>Admin Login</h3>

//             <input
//               type="text"
//               placeholder="Admin ID"
//               value={adminId}
//               onChange={(e) => setAdminId(e.target.value)}
//               style={inputStyle}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={adminPassword}
//               onChange={(e) => setAdminPassword(e.target.value)}
//               style={inputStyle}
//             />

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <div style={{ marginTop: "10px" }}>
//               <button onClick={handleAdminLogin} style={btnStyle("#28a745")}>
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   setShowAdminLogin(false);
//                   setError("");
//                 }}
//                 style={btnStyle("#6c757d")}
//               >
//                 Cancel
//               </button>
//             </div>

//             <p style={{ fontSize: "12px", marginTop: "10px", color: "#555" }}>
//               Demo Admin → ID: <b>admin</b> | Password: <b>admin@123</b>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <footer
//         style={{
//           background: "#111",
//           color: "#aaa",
//           padding: "15px",
//           textAlign: "center",
//         }}
//       >
//         © 2026 Cab Booking System | Built with ❤️ by Shreyash
//       </footer>
//     </div>
//   );
// };

// /* ================= REUSABLE COMPONENTS ================= */

// const Feature = ({ title, desc }) => (
//   <div style={featureCard}>
//     <h4>{title}</h4>
//     <p>{desc}</p>
//   </div>
// );

// /* ================= STYLES ================= */

// const btnStyle = (bg) => ({
//   padding: "10px 18px",
//   margin: "5px",
//   backgroundColor: bg,
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// });

// const featureGrid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//   gap: "20px",
//   marginTop: "30px",
// };

// const featureCard = {
//   border: "1px solid #ddd",
//   padding: "20px",
//   borderRadius: "8px",
//   background: "#f9f9f9",
// };

// const modalOverlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0,0,0,0.6)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const modalBox = {
//   background: "white",
//   padding: "25px",
//   borderRadius: "8px",
//   width: "300px",
//   textAlign: "center",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   marginTop: "10px",
// };

// export default UniversalInterface;

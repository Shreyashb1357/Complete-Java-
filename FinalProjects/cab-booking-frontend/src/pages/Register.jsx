import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("USER");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
  });

  const [driverData, setDriverData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleNumber: "",
  });

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDriverChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === "USER") {
        await axios.post(
          "http://localhost:8080/api/users/register",
          userData
        );
        alert("User registered successfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/drivers/register",
          driverData
        );
        alert("Driver registered successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>

      {/* Role Selector */}
      <select
        style={selectStyle}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="USER">User</option>
        <option value="DRIVER">Driver</option>
      </select>

      <form onSubmit={handleSubmit}>
        {role === "USER" && (
          <>
            <input
              style={inputStyle}
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleUserChange}
              required
            />
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleUserChange}
              required
            />
            <input
              style={inputStyle}
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleUserChange}
              required
            />
            <input
              style={inputStyle}
              type="text"
              name="phone"
              placeholder="Phone"
              value={userData.phone}
              onChange={handleUserChange}
              required
            />
          </>
        )}

        {role === "DRIVER" && (
          <>
            <input
              style={inputStyle}
              type="text"
              name="name"
              placeholder="Name"
              value={driverData.name}
              onChange={handleDriverChange}
              required
            />
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={driverData.email}
              onChange={handleDriverChange}
              required
            />
            <input
              style={inputStyle}
              type="password"
              name="password"
              placeholder="Password"
              value={driverData.password}
              onChange={handleDriverChange}
              required
            />
            <input
              style={inputStyle}
              type="text"
              name="phone"
              placeholder="Phone"
              value={driverData.phone}
              onChange={handleDriverChange}
              required
            />
            <input
              style={inputStyle}
              type="text"
              name="vehicleNumber"
              placeholder="Vehicle Number"
              value={driverData.vehicleNumber}
              onChange={handleDriverChange}
              required
            />
          </>
        )}

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;












// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [role, setRole] = useState("USER");

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "USER",
//   });

//   const [driverData, setDriverData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     vehicleNumber: "",
//   });

//   const handleUserChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleDriverChange = (e) => {
//     setDriverData({ ...driverData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (role === "USER") {
//         await axios.post(
//           "http://localhost:8080/api/users/register",
//           userData
//         );
//         alert("User registered successfully");
//       } else {
//         await axios.post(
//           "http://localhost:8080/api/drivers/register",
//           driverData
//         );
//         alert("Driver registered successfully");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div style={{ width: "400px", margin: "auto" }}>
//       <h2>Register</h2>

//       {/* Role Selector */}
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="USER">User</option>
//         <option value="DRIVER">Driver</option>
//       </select>

//       <form onSubmit={handleSubmit}>
//         {role === "USER" && (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={userData.name}
//               onChange={handleUserChange}
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={userData.email}
//               onChange={handleUserChange}
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={userData.password}
//               onChange={handleUserChange}
//               required
//             />

//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               value={userData.phone}
//               onChange={handleUserChange}
//               required
//             />
//           </>
//         )}

//         {role === "DRIVER" && (
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={driverData.name}
//               onChange={handleDriverChange}
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={driverData.email}
//               onChange={handleDriverChange}
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={driverData.password}
//               onChange={handleDriverChange}
//               required
//             />

//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               value={driverData.phone}
//               onChange={handleDriverChange}
//               required
//             />

//             <input
//               type="text"
//               name="vehicleNumber"
//               placeholder="Vehicle Number"
//               value={driverData.vehicleNumber}
//               onChange={handleDriverChange}
//               required
//             />
//           </>
//         )}

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

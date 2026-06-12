import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (role === "USER") {
        const res = await axios.post(
          "http://localhost:8080/api/users/login",
          null,
          { params: { email, password } }
        );

        if (!res.data || !res.data.userId) {
          alert("Invalid email or password");
          return;
        }

        navigate(`/user/${res.data.userId}`);
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/drivers/login",
          null,
          { params: { email, password } }
        );

        if (!res.data || !res.data.driverId) {
          alert("Invalid email or password");
          return;
        }

        navigate(`/driver/${res.data.driverId}`);
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <>
      {/* External */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.9), rgba(0,0,0,.6)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card shadow-lg"
          style={{
            width: "420px",
            background: "rgba(20,20,20,.9)",
            color: "white",
            borderRadius: "15px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="card-body p-4">
            <h2 className="fw-bold text-center mb-2">Welcome Back</h2>
            <p className="text-secondary text-center mb-4">
              Login to continue your ride
            </p>

            {/* Role Switch */}
            <div className="d-flex justify-content-center mb-4">
              <button
                className={`btn me-2 ${
                  role === "USER" ? "btn-warning" : "btn-outline-light"
                }`}
                onClick={() => setRole("USER")}
                type="button"
              >
                User
              </button>
              <button
                className={`btn ${
                  role === "DRIVER" ? "btn-warning" : "btn-outline-light"
                }`}
                onClick={() => setRole("DRIVER")}
                type="button"
              >
                Driver
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 fw-bold py-2"
              >
                Login as {role === "USER" ? "User" : "Driver"}
              </button>
            </form>

            <p className="text-center text-secondary mt-4 mb-0">
              Secure login • Encrypted credentials
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;










// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [role, setRole] = useState("USER");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       if (role === "USER") {
//         const res = await axios.post(
//           "http://localhost:8080/api/users/login",
//           null,
//           {
//             params: { email, password },
//           }
//         );

//         // ✅ MANUAL CHECK
//         if (!res.data || !res.data.userId) {
//           alert("Invalid email or password");
//           return;
//         }

//         navigate(`/user/${res.data.userId}`);
//       } else {
//         const res = await axios.post(
//           "http://localhost:8080/api/drivers/login",
//           null,
//           {
//             params: { email, password },
//           }
//         );

//         // ✅ MANUAL CHECK
//         if (!res.data || !res.data.driverId) {
//           alert("Invalid email or password");
//           return;
//         }

//         navigate(`/driver/${res.data.driverId}`);
//       }
//     } catch (error) {
//       alert("Login failed");
//       console.error(error);
//     }
//   };


//   return (
//     <div style={{ width: "400px", margin: "auto" }}>
//       <h2>Login</h2>

//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="USER">User</option>
//         <option value="DRIVER">Driver</option>
//       </select>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

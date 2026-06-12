import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const url =
        role === "ADMIN"
          ? "http://localhost:8080/admin/login"
          : "http://localhost:8080/user/login";

      const res = await axios.post(url, null, {
        params: { email, password },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-gradient-to-br from-navy-900 via-blue-900 to-navy-800 overflow-hidden flex items-center justify-center">
      {/* Floating animated circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-700 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-600 rounded-full opacity-20 animate-pulse delay-300"></div>
      <div className="absolute top-1/3 right-[-80px] w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>

      {/* Glassmorphism login card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-12 flex flex-col items-center animate-slideIn">
        <h1 className="text-5xl font-extrabold text-white mb-2 animate-fadeIn">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center mb-10 animate-fadeIn delay-200">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          {/* Role Select */}
          <div className="relative">
            <label className="absolute -top-3 left-3 text-gray-300 bg-navy-900 px-1 text-sm rounded">
              Login As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full border border-gray-600 rounded-xl px-3 py-2 bg-navy-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition duration-300"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-3 left-3 text-gray-300 bg-navy-900 px-1 text-sm rounded">
              Email
            </label>
            <div className="flex items-center border border-gray-600 rounded-xl px-3 py-2 bg-navy-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-400 transition duration-300">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 text-gray-300 bg-navy-900 px-1 text-sm rounded">
              Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-xl px-3 py-2 bg-navy-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-400 transition duration-300">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition transform flex justify-center items-center gap-2"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 font-semibold cursor-pointer hover:underline transition"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("USER");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);

//       const url =
//         role === "ADMIN"
//           ? "http://localhost:8080/admin/login"
//           : "http://localhost:8080/user/login";

//       const res = await axios.post(url, null, {
//         params: { email, password },
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", role);

//       // role-based redirect (simple & correct)
//       if (role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         <p className="text-sm text-gray-600 text-center mt-2">
//           Secure access to your account
//         </p>

//         <form onSubmit={handleLogin} className="mt-8 space-y-5">
//           {/* ROLE */}
//           <div>
//             <label className="text-sm font-medium">Login As</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="mt-2 w-full border rounded-md px-3 py-2"
//             >
//               <option value="USER">User</option>
//               <option value="ADMIN">Admin</option>
//             </select>
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 w-full border rounded-md px-3 py-2"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-2 w-full border rounded-md px-3 py-2"
//             />
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg transform transition-all hover:scale-105"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6">
//           New user?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-emerald-600 font-semibold cursor-pointer"
//           >
//             Create account
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

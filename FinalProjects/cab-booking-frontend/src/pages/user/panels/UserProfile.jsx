import { useEffect, useState } from "react";
import api from "../../../api/api";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const loadUser = async () => {
      try {
        const res = await api.get(`/api/users/${userId}`);
        setUser(res.data);
      } catch {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading)
    return <p style={{ textAlign: "center", color: "#ccc" }}>Loading profile...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "#ff6b6b" }}>{error}</p>;
  if (!user)
    return <p style={{ textAlign: "center", color: "#ccc" }}>No user data found</p>;

  return (
    <div
      className="user-profile"
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "25px",
        borderRadius: "15px",
        background: "#1c1c1e",
        boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
        color: "#eee",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#333",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            color: "#ffcc00",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ marginTop: "12px", marginBottom: "5px", color: "#ffcc00" }}>
          Hello, {user.name}
        </h2>
        <p style={{ color: "#aaa", fontSize: "14px" }}>User Profile</p>
      </div>

      {/* Profile Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <ProfileRow label="User ID" value={user.userId} />
        <ProfileRow label="Name" value={user.name} />
        <ProfileRow label="Email" value={user.email} />
        <ProfileRow label="Role" value={user.role} />
        <ProfileRow label="Phone" value={user.phone || "-"} />
      </div>
    </div>
  );
};

// Small helper component for a row
const ProfileRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #333",
      fontSize: "15px",
    }}
  >
    <strong style={{ color: "#aaa" }}>{label}:</strong>
    <span style={{ color: "#eee" }}>{value}</span>
  </div>
);

export default UserProfile;






// import { useEffect, useState } from "react";
// import api from "../../../api/api";

// const UserProfile = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!userId) return;

//     const loadUser = async () => {
//       try {
//         const res = await api.get(`/api/users/${userId}`);
//         setUser(res.data);
//       } catch {
//         setError("Failed to load user profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [userId]);

//   if (loading) {
//     return <p>Loading profile...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>;
//   }

//   if (!user) {
//     return <p>No user data found</p>;
//   }

//   return (
//     <div className="user-profile">
//       <h1>Hello , {user.name}</h1>
//       <h3>User Profile</h3>

//       <div>
//         <strong>User Id:</strong> {user.userId}
//       </div>

//       <div>
//         <strong>Name:</strong> {user.name}
//       </div>

//       <div>
//         <strong>Email:</strong> {user.email}
//       </div>

//       <div>
//         <strong>Role:</strong> {user.role}
//       </div>

//       <div>
//         <strong>Phone No:</strong> {user.phone}
//       </div>

//       {/* Add more fields ONLY if they exist in your User entity */}
//     </div>
//   );
// };

// export default UserProfile;

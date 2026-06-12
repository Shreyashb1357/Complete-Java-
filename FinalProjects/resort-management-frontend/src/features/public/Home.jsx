import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900 tracking-wide">
            Resort<span className="text-emerald-600">Hub</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="hover:text-emerald-600">Home</button>
            <button onClick={() => navigate("/resorts")} className="hover:text-emerald-600">
              Resorts
            </button>
            <button className="hover:text-emerald-600">About</button>
            <button className="hover:text-emerald-600">Contact</button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold border rounded-md hover:bg-gray-100 transition"
            >
              Login
            </button>
           <button
            onClick={() => navigate("/register")}
            style={{ border: "2px solid red" }}
            >
            Sign Up
            </button>

          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              A Smarter Way to <br />
              <span className="text-emerald-400">Book & Manage Resorts</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              ResortHub is a unified platform for customers, resort owners,
              and administrators to manage bookings, payments, rooms,
              services, and insights — all in one secure system.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/resorts")}
                className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md font-semibold transition transform hover:scale-105"
              >
                Browse Resorts
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 border border-white/30 rounded-md hover:bg-white/10 transition"
              >
                Owner / Admin Login
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block animate-slideUp">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur border border-white/20">
              <h3 className="text-lg font-semibold mb-6">
                Why Businesses Choose ResortHub
              </h3>
              <ul className="space-y-4 text-gray-200 text-sm">
                <li>✔ Role-based secure access (JWT)</li>
                <li>✔ Centralized booking & payment management</li>
                <li>✔ Real-time availability & occupancy tracking</li>
                <li>✔ Admin-level analytics & audit logs</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SEARCH BAR ================= */}
      <section className="-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="City" />
          <input className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Location" />
          <input type="date" className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
          <button
            onClick={() => navigate("/resorts")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Designed for Every Stakeholder</h2>
          <p className="mt-4 text-gray-600">
            A modular, scalable platform that adapts to different business roles
            without compromising performance or security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          <Feature title="Customers" desc="Discover resorts, compare prices, manage bookings, payments, and reviews effortlessly." />
          <Feature title="Resort Owners" desc="Control resorts, rooms, services, pricing, and track revenue & occupancy in real time." />
          <Feature title="Administrators" desc="Manage users, approve resorts, configure pricing rules, and monitor platform health." />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-semibold text-lg">ResortHub</h4>
            <p className="mt-4 text-sm">
              A modern resort booking & management solution built for scale.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm">Business Access</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Owner Login</li>
              <li>Admin Login</li>
              <li>System Status</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 text-center py-4 text-xs">
          © 2026 ResortHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ================= REUSABLE FEATURE CARD ================= */
function Feature({ title, desc }) {
  return (
    <div className="border rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-1 bg-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-gray-600">{desc}</p>
    </div>
  );
}

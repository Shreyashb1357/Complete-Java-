import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8080/user/resort";

export default function ResortDetails() {
  const { id } = useParams();

  const [resort, setResort] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [resortRes, imgRes] = await Promise.all([
          axios.get(`${BASE_URL}/getById`, { params: { resId: id } }),
          axios.get(`${BASE_URL}/getResortImg`, { params: { resortId: id } }),
        ]);

        setResort(resortRes.data);
        setImages(imgRes.data || []);
      } catch (err) {
        setError("Unable to load resort details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 animate-pulse">
        Loading resort details...
      </div>
    );
  }

  if (error || !resort) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Resort not found"}
      </div>
    );
  }

  const { name, description, rating, ecoScore, isActive, location } = resort;
  const city = location?.city;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* ================= IMAGE GALLERY ================= */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.length > 0 ? (
            images.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-500"
              >
                <img
                  src={img}
                  alt="Resort"
                  className="h-64 w-full object-cover transition-transform duration-700"
                />
              </div>
            ))
          ) : (
            <div className="h-64 bg-gray-400 rounded-xl col-span-3 animate-pulse" />
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2 space-y-6 animate-fadeIn">
          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 tracking-wide animate-pulse">
            {name}
          </h1>

          {/* LOCATION */}
          <p className="mt-1 text-gray-600 text-lg">
            📍 {location?.locationName}, {city?.cityName}, {city?.state}, {city?.country}
          </p>

          {/* META INFO */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold shadow-md">
              ⭐ {rating || "N/A"} Rating
            </span>

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold shadow-md">
              🌱 Eco Score: {ecoScore || "N/A"}
            </span>

            <span
              className={`px-3 py-1 rounded-full font-semibold shadow-md ${
                isActive === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isActive}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6 space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">About this resort</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {description || "No description available for this resort."}
            </p>
          </div>
        </div>

        {/* ================= BOOKING CARD ================= */}
        <aside className="bg-white rounded-2xl shadow-2xl p-6 h-fit sticky top-24 transform transition-all hover:scale-105 duration-500 animate-fadeIn">
          <h3 className="text-xl font-semibold text-slate-900">Plan your stay</h3>

          <p className="text-sm text-gray-600 mt-1">Select dates to check availability</p>

          <div className="mt-5 space-y-3">
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300"
            />
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300"
            />
          </div>

          <button
            className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg transform transition-all hover:scale-105"
          >
            Book Now
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            Secure booking · Instant confirmation · Trusted partners
          </p>
        </aside>
      </section>
    </div>
  );
}

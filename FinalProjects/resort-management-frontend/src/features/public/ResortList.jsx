import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8080/user/resort";

export default function ResortList() {
  const navigate = useNavigate();

  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [locationId, setLocationId] = useState("");
  const [rating, setRating] = useState("");
  const [resortImages, setResortImages] = useState({});
  const [locations, setLocations] = useState([]);

  const [filterOpen, setFilterOpen] = useState(true); // toggle filter panel

  const extractLocations = (resortsData) => {
    const uniqueLocations = [];
    const seenIds = new Set();

    resortsData.forEach((resort) => {
      const loc = resort.location;
      if (loc && !seenIds.has(loc.locationId)) {
        seenIds.add(loc.locationId);
        uniqueLocations.push(loc);
      }
    });

    setLocations(uniqueLocations);
  };

  const fetchAllResorts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getAllResort`);
      const resortsData = res.data || [];
      setResorts(resortsData);
      extractLocations(resortsData);

      const images = {};
      await Promise.all(
        resortsData.map(async (r) => {
          images[r.resortId] = await fetchResortImages(r.resortId);
        })
      );
      setResortImages(images);
    } catch {
      setError("Failed to load resorts");
    } finally {
      setLoading(false);
    }
  };

  const fetchResortImages = async (resortId) => {
    try {
      const res = await axios.get(`${BASE_URL}/getResortImg`, {
        params: { resortId },
      });
      return res.data?.[0] || null;
    } catch {
      return null;
    }
  };

  const fetchByLocation = async () => {
    if (!locationId) return fetchAllResorts();
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getByLoc`, {
        params: { loc: locationId },
      });
      const resortsData = res.data || [];
      setResorts(resortsData);
      extractLocations(resortsData);
    } catch {
      setError("Failed to filter by location");
    } finally {
      setLoading(false);
    }
  };

  const fetchTopRated = async () => {
    if (!rating) return fetchAllResorts();
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/topResort`, { params: { rating } });
      setResorts(res.data || []);
    } catch {
      setError("Failed to filter by rating");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResorts();
  }, []);

  const applyFilters = () => {
    if (rating) fetchTopRated();
    else fetchByLocation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 transition-colors duration-700">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center space-x-4">
          <img
            src="https://png.pngtree.com/png-clipart/20250102/original/pngtree-logo-design-vector-png-image_4150315.png"
            alt="ResortLogo"
            className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 animate-pulse">
              Explore Resorts ✨
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Verified resorts for a perfect getaway 🌴
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTER PANEL */}
        <aside className="bg-black rounded-xl p-6 shadow-lg transition-all duration-500">
            
        {/* Toggle Button - always visible */}
        <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="mb-4 px-4 py-2 bg-emerald-600 text-black rounded-md font-semibold w-full hover:bg-emerald-500 transition transform hover:scale-105"
        >
            {filterOpen ? "Close Filters" : "Open Filters"}
        </button>

        {/* Collapsible Filter Content */}
        <div
            className={`transition-all duration-500 overflow-hidden ${
            filterOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            {/* Navigation buttons */}
            <div className="flex flex-col gap-3 mb-4">
            <button
                onClick={() => navigate("/")}
                className="bg-gray-800 text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition transform hover:scale-105"
            >
                Home
            </button>
            <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-black px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition transform hover:scale-105"
            >
                Login
            </button>
            <button
                onClick={() => navigate("/register")}
                className="bg-emerald-600 text-black px-4 py-2 rounded-md font-semibold hover:bg-emerald-500 transition transform hover:scale-105"
            >
                Register
            </button>
            </div>

            {/* Filters */}
            <h3 className="font-semibold text-lg mb-2 text-emerald-600">Filter Resorts 🔍</h3>

            <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="mt-2 w-full text-white border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
            <option value="">All Locations</option>
            {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                {loc.locationName} ({loc.city.cityName})
                </option>
            ))}
            </select>

            <div>
            <label className="font-medium text-lg mb-2 text-emerald-600">Minimum Rating ⭐</label>
            <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-2 w-full text-white border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
                <option value="">Any</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
            </select>
            </div>

            <button
            onClick={applyFilters}
            className="w-full !bg-white hover:bg-emerald-700 text-black py-2 rounded-md font-semibold transition transform hover:scale-105 hover:shadow-lg mt-3"
            >
            Apply Filters
            </button>
        </div>
        </aside>


        {/* RESORT GRID */}
        <section className="lg:col-span-3">
          {loading && <p className="text-gray-600 animate-pulse">Loading resorts...</p>}
          {error && <p className="text-red-500 font-medium">{error}</p>}
          {!loading && resorts.length === 0 && (
            <p className="text-gray-600">No resorts found for selected criteria.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resorts.map((resort) => (
              <div
                key={resort.resortId}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                {/* IMAGE */}
                <div className="h-48 bg-gray-200 relative group overflow-hidden">
                  {resortImages[resort.resortId] ? (
                    <img
                      src={resortImages[resort.resortId]}
                      alt={resort.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-20 transition"></div>
                  {resort.ecoScore && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 text-xs rounded-md font-semibold shadow-md">
                      ♻️ {resort.ecoScore}
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-emerald-700">{resort.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 <b>{resort.location?.locationName}</b>, {resort.location?.city?.cityName}, {resort.location?.city?.state}, {resort.location?.city?.country}
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    ⭐ Rating: <span className="text-yellow-500">{resort.rating ?? "N/A"}</span>
                  </p>
                  {resort.description && (
                    <p className="mt-2 text-gray-500 text-sm italic line-clamp-3">{resort.description}</p>
                  )}
                  <button
                    onClick={() => navigate(`/resort/${resort.resortId}`)}
                    className="mt-4 w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white py-2 rounded-md font-semibold transition transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


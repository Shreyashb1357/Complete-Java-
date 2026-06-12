import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

const MapPicker = ({
  pickup,
  drop,
  onSelect,
  onClear,
  onRouteCalculated,
}) => {
  const routingRef = useRef(null);

  /* =========================
     CLICK HANDLING (SAFE)
     ========================= */
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // 🚫 READ-ONLY MODE
        if (!onSelect) return;

        if (!pickup) onSelect("pickup", e.latlng);
        else if (!drop) onSelect("drop", e.latlng);
      },
    });
    return null;
  };

  /* =========================
     ROUTE + ETA CALCULATION
     ========================= */
  useEffect(() => {
    if (pickup && drop && onRouteCalculated) {
      const distanceKm = pickup.distanceTo(drop) / 1000;
      const avgSpeed = 40; // km/h
      const etaMin = Math.round((distanceKm / avgSpeed) * 60);

      onRouteCalculated(distanceKm.toFixed(2), etaMin);
    }
  }, [pickup, drop, onRouteCalculated]);

  return (
    <>
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Enable clicks ONLY if onSelect exists */}
        {onSelect && <MapEvents />}

        {pickup && <Marker position={pickup} />}
        {drop && <Marker position={drop} />}

        {pickup && drop && (
          <Routing pickup={pickup} drop={drop} routingRef={routingRef} />
        )}
      </MapContainer>

      {/* 🔴 Clear button ONLY in interactive mode */}
      {onClear && (pickup || drop) && (
        <button
          onClick={onClear}
          style={{
            marginTop: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            padding: "6px 12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear Selection
        </button>
      )}
    </>
  );
};

/* =========================
   ROUTING CONTROL
   ========================= */
const Routing = ({ pickup, drop, routingRef }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [pickup, drop],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      showAlternatives: false,
      routeWhileDragging: false,
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
      }
    };
  }, [pickup, drop, map]);

  return null;
};

export default MapPicker;

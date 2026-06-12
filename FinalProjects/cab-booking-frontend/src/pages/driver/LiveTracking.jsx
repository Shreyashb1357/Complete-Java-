import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

const LiveTracking = ({ rideId }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const stompClientRef = useRef(null);
  const mapRefObj = useRef(null);

  useEffect(() => {
    // 🛑 SAFETY: If Google Maps is not available, exit silently
    if (!window.google || !window.google.maps) {
      console.warn("Google Maps not available. LiveTracking disabled.");
      return;
    }

    // 🗺️ Initialize Map ONLY ONCE
    if (!mapRefObj.current) {
      mapRefObj.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 18.5204, lng: 73.8567 }, // default (Pune)
      });

      markerRef.current = new window.google.maps.Marker({
        map: mapRefObj.current,
      });
    }

    // 🔌 WebSocket + STOMP
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    // 🔇 Disable debug logs (important for stability)
    stompClient.debug = null;

    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      () => {
        stompClient.subscribe(
          `/topic/ride/${rideId}/location`,
          (message) => {
            try {
              const location = JSON.parse(message.body);

              if (
                typeof location.lat !== "number" ||
                typeof location.lng !== "number"
              ) {
                return;
              }

              const position = {
                lat: location.lat,
                lng: location.lng,
              };

              markerRef.current.setPosition(position);
              mapRefObj.current.setCenter(position);
            } catch (e) {
              console.error("Invalid location data", e);
            }
          }
        );
      },
      (error) => {
        console.warn("WebSocket connection failed", error);
      }
    );

    // 🧹 CLEANUP (SAFE)
    return () => {
      if (
        stompClientRef.current &&
        stompClientRef.current.connected
      ) {
        stompClientRef.current.disconnect(() => {
          console.log("WebSocket disconnected cleanly");
        });
      }
    };
  }, [rideId]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "400px",
        width: "100%",
        border: "1px solid #ccc",
        marginTop: "10px",
      }}
    />
  );
};

export default LiveTracking;

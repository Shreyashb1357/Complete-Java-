import { useEffect, useRef } from "react";

const RideMap = ({ pickupLat, pickupLng, dropLat, dropLng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const pickup = { lat: pickupLat, lng: pickupLng };
    const drop = { lat: dropLat, lng: dropLng };

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: pickup,
    });

    new window.google.maps.Marker({
      position: pickup,
      map,
      label: "P",
    });

    new window.google.maps.Marker({
      position: drop,
      map,
      label: "D",
    });
  }, [pickupLat, pickupLng, dropLat, dropLng]);

  return <div ref={mapRef} style={{ height: "300px", width: "100%" }} />;
};

export default RideMap;





// import { useEffect, useRef } from "react";

// const RideMap = ({ pickupLat, pickupLng, dropLat, dropLng }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!window.google) return;

//     const pickup = { lat: pickupLat, lng: pickupLng };
//     const drop = { lat: dropLat, lng: dropLng };

//     const map = new window.google.maps.Map(mapRef.current, {
//       zoom: 14,
//       center: pickup,
//     });

//     new window.google.maps.Marker({
//       position: pickup,
//       map,
//       label: "P",
//     });

//     new window.google.maps.Marker({
//       position: drop,
//       map,
//       label: "D",
//     });

//     const directionsService = new window.google.maps.DirectionsService();
//     const directionsRenderer = new window.google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(map);

//     directionsService.route(
//       {
//         origin: pickup,
//         destination: drop,
//         travelMode: "DRIVING",
//       },
//       (result, status) => {
//         if (status === "OK") {
//           directionsRenderer.setDirections(result);
//         }
//       }
//     );
//   }, [pickupLat, pickupLng, dropLat, dropLng]);

//   return <div ref={mapRef} style={{ height: "300px", width: "100%" }} />;
// };

// export default RideMap;

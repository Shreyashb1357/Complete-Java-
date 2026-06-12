const EmbedMap = ({ pickupLat, pickupLng, dropLat, dropLng }) => {
  const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&origin=${pickupLat},${pickupLng}&destination=${dropLat},${dropLng}`;

  return (
    <iframe
      title="Route Map"
      src={url}
      width="100%"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default EmbedMap;


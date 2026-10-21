function initMap() {
  const location = { lat: -25.7479, lng: 28.2293 }; // Pretoria

  const greyscaleStyle = [
    { elementType: "geometry", stylers: [{ color: "#f2f2f2" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#555555" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#d9d9d9" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#999999" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dcdcdc" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] }
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Grey Pitori"
  });

  const info = new google.maps.InfoWindow({
    content: "<strong>GREY PITORI</strong><br>Pretoria, South Africa"
  });

  marker.addListener("click", () => info.open(map, marker));
}
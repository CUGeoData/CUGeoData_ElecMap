// Version 1.0.0
mapboxgl.accessToken = "pk.eyJ1Ijoia2V2aW54c2hhbmciLCJhIjoiY2xzb2FyeWkzMGRuZTJsbnl6enJvMzY1ZSJ9.oVhcnWifoSeqv554mrjaKg";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-76.4735, 42.4534],
  zoom: 15,
});

// Use the provided hex_colors for each month
const levelColors = [
  '#083a7a', // January
  '#08306b', // February
  '#08468c', // March
  '#f7fbff', // April
  '#1967ad', // May
  '#084b94', // June
  '#0c56a0', // July
  '#08519c', // August
  '#08509a', // September
  '#0f5ba3', // October
  '#084e97', // November
  '#083877'  // December
];

map.on('load', function () {
  map.addSource('cornellBuildings', {
    type: 'geojson',
    data: 'cugir-008163-geojson.json',
  });

  map.addLayer({
    id: 'buildings',
    type: 'fill',
    source: 'cornellBuildings',
    layout: {},
    paint: {
      // Initial color setting, with a default color for buildings other than Duffield Hall
      'fill-color': [
        'case',
        ['==', ['get', 'buildingna'], 'DUFFIELD HALL'], levelColors[0], // Initial color for Duffield Hall
        '#CCCCCC' // Default color for other buildings
      ],
      'fill-opacity': 0.75,
    }
  });

  document.getElementById('timeSlider').addEventListener('input', function () {
    const monthIndex = parseInt(this.value, 10); // Adjust based on slider's position (0 to 11 for Jan to Dec)

    // Update only Duffield Hall's color based on the slider, leave other buildings with their default color
    map.setPaintProperty('buildings', 'fill-color', [
      'case',
      ['==', ['get', 'buildingna'], 'DUFFIELD HALL'], levelColors[monthIndex], // Adjusted color for Duffield Hall
      '#CCCCCC' // Default color remains for other buildings
    ]);
  });
});


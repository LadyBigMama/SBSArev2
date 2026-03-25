window.noLandMapData = {
  legend: [
    { label: "No-land zone", color: "rgba(214, 75, 75, 0.76)" },
    { label: "Reference flight path", color: "#19426a" },
    { label: "Landmark / site label", color: "#ffffff" }
  ],
  notes: [
    "This is the repo-owned replacement for the current Google My Maps embed.",
    "Edit polygon points, route points, and labels in this file to keep the map easy to update.",
    "The current zone shapes are starter placeholders and should be replaced with real SBSA geometry.",
    "Carpinteria polo fields are marked approximately based on the Santa Barbara Polo & Racquet Club area."
  ],
  zones: [
    {
      name: "Placeholder Zone A",
      points: "800,500 930,430 1120,480 1080,640 860,650",
      fill: "rgba(214, 75, 75, 0.28)",
      stroke: "#c23232"
    },
    {
      name: "Placeholder Zone B",
      points: "450,600 620,540 700,620 640,760 470,760 390,690",
      fill: "rgba(237, 122, 58, 0.24)",
      stroke: "#d9742e"
    }
  ],
  routes: [
    {
      name: "Reference Route",
      points: "180,590 330,520 510,470 720,420 990,360 1210,280",
      stroke: "#19426a",
      dashArray: "20 14"
    }
  ],
  labels: [
    { text: "Elings", x: 180, y: 560 },
    { text: "VOR", x: 710, y: 370 },
    { text: "The T", x: 360, y: 705 },
    {
      text: "Polo Fields",
      x: 1160,
      y: 535,
      color: "#7a3e0d",
      marker: true,
      markerRadius: 12,
      markerFill: "#d9742e",
      markerStroke: "#fff4d6"
    },
    { text: "Replace With Real Zones", x: 860, y: 170, color: "#0b76b8" }
  ]
};

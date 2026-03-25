(function() {
  function createSvgNode(name, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attrs || {}).forEach(function(key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function renderLegend(data) {
    var root = document.getElementById("no-land-map-legend");
    if (!root) {
      return;
    }

    root.innerHTML = "";

    (data.legend || []).forEach(function(item) {
      var row = document.createElement("div");
      var swatch = document.createElement("span");
      var label = document.createElement("span");

      row.className = "map-builder-legend-row";
      swatch.className = "map-builder-swatch";
      swatch.style.background = item.color || "#d64b4b";
      label.textContent = item.label;

      row.appendChild(swatch);
      row.appendChild(label);
      root.appendChild(row);
    });
  }

  function renderNotes(data) {
    var root = document.getElementById("no-land-map-notes");
    if (!root) {
      return;
    }

    root.innerHTML = "";

    (data.notes || []).forEach(function(note) {
      var p = document.createElement("p");
      p.textContent = note;
      root.appendChild(p);
    });
  }

  function renderZones(data) {
    var root = document.getElementById("no-land-zones");
    if (!root) {
      return;
    }

    root.innerHTML = "";

    (data.zones || []).forEach(function(zone) {
      var polygon = createSvgNode("polygon", {
        points: zone.points,
        fill: zone.fill || "rgba(214, 75, 75, 0.28)",
        stroke: zone.stroke || "#c23232",
        "stroke-width": zone.strokeWidth || "5"
      });

      polygon.setAttribute("class", "map-zone-shape");
      root.appendChild(polygon);
    });
  }

  function renderRoutes(data) {
    var root = document.getElementById("no-land-routes");
    if (!root) {
      return;
    }

    root.innerHTML = "";

    (data.routes || []).forEach(function(route) {
      var polyline = createSvgNode("polyline", {
        points: route.points,
        fill: "none",
        stroke: route.stroke || "#19426a",
        "stroke-width": route.strokeWidth || "6",
        "stroke-dasharray": route.dashArray || "18 12",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      });

      polyline.setAttribute("class", "map-route-line");
      root.appendChild(polyline);
    });
  }

  function renderLabels(data) {
    var root = document.getElementById("no-land-labels");
    if (!root) {
      return;
    }

    root.innerHTML = "";

    (data.labels || []).forEach(function(label) {
      var group = createSvgNode("g", {
        transform: "translate(" + label.x + " " + label.y + ")"
      });
      var marker;
      var bg = createSvgNode("rect", {
        x: "-12",
        y: "-34",
        rx: "14",
        ry: "14",
        width: String((label.text || "").length * 10 + 24),
        height: "42",
        fill: "rgba(255, 255, 255, 0.92)",
        stroke: "#bdd4e6",
        "stroke-width": "2"
      });
      var text = createSvgNode("text", {
        x: "0",
        y: "-8",
        fill: label.color || "#16314a",
        "font-size": label.size || "24",
        "font-weight": label.weight || "700"
      });

      if (label.marker) {
        marker = createSvgNode("circle", {
          cx: "-28",
          cy: "-13",
          r: label.markerRadius || "10",
          fill: label.markerFill || "#d9742e",
          stroke: label.markerStroke || "#ffffff",
          "stroke-width": label.markerStrokeWidth || "4"
        });
        group.appendChild(marker);
      }

      text.textContent = label.text;
      group.appendChild(bg);
      group.appendChild(text);
      root.appendChild(group);
    });
  }

  function init() {
    var data = window.noLandMapData;
    if (!data) {
      return;
    }

    renderLegend(data);
    renderNotes(data);
    renderZones(data);
    renderRoutes(data);
    renderLabels(data);
  }

  document.addEventListener("DOMContentLoaded", init);
}());

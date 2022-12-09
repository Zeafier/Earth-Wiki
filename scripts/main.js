// variables
var planet = planetaryjs.planet();
var canvas = document.getElementById('globe');

// You can remove this statement if `world-110m.json`
// is in the same path as the HTML page:
planet.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file: 'scripts/world-110m.json' },
    oceans:   { fill:   '#000080' },
    land:     { fill:   '#339966' },
    borders:  { stroke: '#008000' }
}));

planetaryjs.plugins.pings({
  color: 'yellow', ttl: 5000, angle: 10
});

planetaryjs.plugins.zoom({
  scaleExtent: [200, 1000],
  onZoom: function() {
    console.log("The planet was zoomed!", this, d3.event);
  }
});

planetaryjs.plugins.drag({
  onDrag: function() {
    console.log("The planet was dragged!");
  }
});

planet.draw(canvas);

var autorotate = function(degreesPerTick) {
  return function(planet) {
    var paused = false;

    // Attach our public API to `planet.plugins`
    // on the `autorotate` namespace.
    planet.plugins.autorotate = {
      pause:  function() { paused = true;  },
      resume: function() { paused = false; }
    };

    planet.onDraw(function() {
      if (paused) return;

      var rotation = planet.projection.rotate();
      rotation[0] += degreesPerTick;
      if (rotation[0] >= 180) rotation[0] -= 360;
      planet.projection.rotate(rotation);
    });
  };
};

planet.loadPlugin(autorotate(.1));

planet.projection.scale(250).translate([250, 250]);
planet.draw(canvas);
// variables
var planet = planetaryjs.planet();
var canvas = document.getElementById('globe');

// You can remove this statement if `world-110m.json`
// is in the same path as the HTML page:
planet.loadPlugin(
  planetaryjs.plugins.earth({
    topojson: { file: 'scripts/world-110m.json' },
    oceans:   { fill:   '#000080' },
    land:     { fill:   '#339966' },
    borders:  { stroke: '#008000' }
  })
);

planet.loadPlugin(
  planetaryjs.plugins.pings({
    color: 'yellow', ttl: 5000, angle: 10
  })
)

planet.loadPlugin(planetaryjs.plugins.zoom({
  scaleExtent: [200, 1000],
  onZoom: function() {
    console.log("The planet was zoomed!", this, d3.event);
  }
}))

planet.loadPlugin(
  planetaryjs.plugins.drag({
    onDrag: function() {
      console.log("The planet was dragged!");
    }
  })
)

planet.onDraw(function() {
  var rotation = planet.projection.rotate();
  rotation[0] += .1;
  if (rotation[0] >= 180) rotation[0] -= 360;
  planet.projection.rotate(rotation);
});

planet.projection.scale(250).translate([400, 400]);
planet.draw(canvas);

//Open menu when clicked
// let runFunction = () => {
//   console.log("I am running")
//   let secondary_menu = document.getElementById("filter_box");
//   secondary_menu.style.opacity = 1;
// }

// canvas.onclick = runFunction;

//Expand menu
let show_sub_options = (element_id, item) => {

//   //add display to selected
  item.classList.toggle('active');
  let element = document.getElementById(element_id);
  element.style.display = item.classList.contains('active') ? 'flex' : 'none';
}

//toggle filters
let hideFilters = () => {
  let element = document.getElementById('main_menu');
  let style = element.style;
  let menus = document.querySelectorAll('.side_menu');

  if(style.display === 'none') {
    style.display = 'flex';
    menus[0].classList.toggle('hidden');
  }else{
    style.display = 'none';
    menus[0].classList.add('hidden');
  }
}
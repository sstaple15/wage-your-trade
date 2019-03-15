// exclusively to create a first rendition
promise = new Promise((resolve) => {
  data = d3.json("https://d3js.org/us-10m.v1.json");
  resolve(data);
})

promise
.then((geoJSON) => {
  set_choropleth(geoJSON);
  data = d3.json("cty_stuff.json");
  return data;
})
.then(data => reformat(data))
.then(data => update_choropleth(data));

// update cycle
function update_scalars (sc, value) {
  window[sc] = value;
  let promise = new Promise((resolve) => {
    data = d3.json("cty_stuff.json");
    resolve(data);
  });
  promise
  .then(data => reformat(data))
  .then(data => update_choropleth(data));
}

// global scalars to start
var SC_AGR = 0.30;
var SC_MAN = 0.25;
var SC_MIN = 0.05;
var SC_EDU = 0;
var SC_ENG = 0.20;
var SC_BUS = 0;
var SC_ITS = 0;
var SC_FIN = 0;
var CURRENT_MET = 'ind';

// misc functions
function reformat (data) {
  return data.reduce((acc, d) => {
    acc[d.id] = { 'cty' : d.cty_name,
                  'agr' : d.ag_jobs,
                  'man' : d.man_jobs,
                  'min' : d.min_jobs,
                  'edu' : d.ed_jobs,
                  'eng' : d.eng_jobs,
                  'bus' : d.bus_jobs,
                  'its' : d.it_jobs,
                  'fin' : d.fin_jobs,
                  'ind' : (SC_AGR*d.ag_jobs + SC_MAN*d.man_jobs +
                           SC_MIN*d.min_jobs + SC_EDU*d.ed_jobs +
                           SC_ENG*d.eng_jobs + SC_BUS*d.bus_jobs +
                           SC_ITS*d.it_jobs + SC_FIN*d.fin_jobs)
                };
    return acc;
  });
}

function computeDomain(data, key) {
  min = d3.min(Object.values(data), function (d) {
    return d[key];
  });
  max = d3.max(Object.values(data), function (d) {
    return d[key];
  });
  return {min: min, max: max};
}

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// adapted from https://bl.ocks.org/mbostock/2206590
// function clicked(d) {
//   if (active.node() === this) return reset();
//   active.classed("active", false);
//   active = d3.select(this).classed("active", true);
//
//   var bounds = path.bounds(d),
//       dx = bounds[1][0] - bounds[0][0],
//       dy = bounds[1][1] - bounds[0][1],
//       x = (bounds[0][0] + bounds[1][0]) / 2,
//       y = (bounds[0][1] + bounds[1][1]) / 2,
//       scale = .9 / Math.max(dx / width, dy / height),
//       translate = [width / 2 - scale * x, height / 2 - scale * y];
//
//   g.transition()
//       .duration(750)
//       .style("stroke-width", 1.5 / scale + "px")
//       .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
// }
//
// function reset() {
//   active.classed("active", false);
//   active = d3.select(null);
//
//   g.transition()
//       .duration(750)
//       .style("stroke-width", "1.5px")
//       .attr("transform", "");
// }


//scalebar
var x = d3.scaleLinear()
    .domain([0, 10])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(1, 10))
    .range(['#fff', '#ffffd9', '#edf8b1', '#c7e9b4',
            '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8',
            '#253494', '#081d58']);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Jobs Supported per 10,000 Employed");

g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickFormat(function(x, i) { return i ? x*400 : x*400; })
    .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  .select(".domain")
    .remove();

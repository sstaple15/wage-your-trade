// exclusively to create a first rendition
promise = new Promise((resolve) => {
  data = d3.json("https://d3js.org/us-10m.v1.json");
  resolve(data);
})

promise
  .then((geoJSON) => {
    set_choropleth(geoJSON);
    set_scalebar();
    data = d3.json("cty_stuff.json");
    return data;
  })
  .then(data => reformat(data))
  .then(data => update_choropleth(data))
  .then(data => update_scalebar(data));

// update cycle
function update_scalars (sc, value) {
  window[sc] = value;
  let promise = new Promise((resolve) => {
    data = d3.json("cty_stuff.json");
    resolve(data);
  });
  promise
  .then(data => reformat(data))
  .then(data => update_choropleth(data))
  .then(data => update_scalebar(data));
}

// global scalars to start
var SC_AGR = 0.25;
var SC_MAN = 0.20;
var SC_MIN = 0.05;
var SC_EDU = 0;
var SC_ENG = 0.20;
var SC_BUS = 0;
var SC_ITS = 0.05;
var SC_FIN = 0;
var CURRENT_MET = 'ind';

// misc functions
function reformat (data) {
  return data.reduce((acc, d) => {
    // create curve for each linear estimate
    acc[d.id] = { 'cty' : d.cty_name,
                  'agr' : SC_AGR*d.ag_jobs,
                  'man' : SC_MAN*d.man_jobs,
                  'min' : SC_MIN*d.min_jobs,
                  'edu' : SC_EDU*d.ed_jobs,
                  'eng' : SC_ENG*d.eng_jobs,
                  'bus' : SC_BUS*d.bus_jobs,
                  'its' : SC_ITS*d.it_jobs,
                  'fin' : SC_FIN*d.fin_jobs,
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

// upon consultation with Justin Cohler
// bins = (max, val, n = 100) => Math.trunc(val / max * buckets);

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

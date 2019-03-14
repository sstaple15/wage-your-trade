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
function update_scalars (value) {
  SC_AGR = value
  let promise = new Promise((resolve) => {
    data = d3.json("cty_stuff.json");
    resolve(data);
  });
  promise
  .then(data => reformat(data))
  .then(data => update_choropleth(data));
}

// global scalars to start
var SC = 0.25;
var SC_AGR = 0.25;
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
                  'ind' : (SC_AGR*d.ag_jobs + SC*d.man_jobs + SC*d.min_jobs + SC*d.ed_jobs +
                          SC*d.eng_jobs + SC*d.bus_jobs + SC*d.it_jobs + SC*d.fin_jobs)
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

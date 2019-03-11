var promises = [
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.json("cty_stuff.json")
];
Promise.all(promises)
.then(data => choropleth(data));

function computeDomain(data, key) {
  return data.reduce((acc, row) => {
    return {
      min: Math.min(acc.min, row[key]),
      max: Math.max(acc.max, row[key])
    };
  }, {min: Infinity, max: -Infinity});
}

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var cty_stuff = d3.map();
var path = d3.geoPath();

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

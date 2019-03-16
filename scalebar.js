// adapted from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
async function set_scalebar() {

  d3.select('#hist')
    .append('svg')
    .attr('id', 'histogram')
    .attr('height', 175)
    .attr('width', 500)
    .attr('color', 'black');

  let histogram = d3.select('#histogram');

  //scalebar
  var x = d3.scaleLinear()
      .domain([0, 10])
      .rangeRound([10, 410]);

  var color = d3.scaleThreshold()
      .domain(d3.range(1, 10))
      .range(['#fff', '#ffffd9', '#edf8b1', '#c7e9b4',
              '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8',
              '#253494', '#081d58']);

  var g = histogram.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,135)");

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
      .attr("y", 38)
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

}

//   const [cty_stuff] = data;
//
//   let bar_df = {};
//   breaks = 10
//   for (i=0; i <= breaks; i++) {
//     bar_df[i] = 0;
//   }
//
//   let maxed = computeDomain(data, "ag_jobs");
//   var nbreaks = (max, val, buckets = 100) => Math.trunc(val/max*buckets);
//
//   // create linear and color scales for choropleth
//   const jobDomain = computeDomain(data, "ag_jobs");
//   var cty_jobs = data.reduce((acc, row) => {
//     acc[row.id] = row.ag_jobs;
//     return acc;
//   }, {});
//   const jobScale = d3.scaleLinear().domain([0, jobDomain.max]).range([0,1])
//   const colorScale = d => d3.interpolateYlGnBu(jobScale(d));
//
//   Object.values(data)
//     .map(d => nbreaks(maxed, d.ag_jobs, breaks))
//     .forEach((d) => {
//       bar_df[d] ? bar_df[d]++ : bar_df[d] = 1;
//     });
//
//   let bar_x = d3.scaleBand()
//         .rangeRound([0, 600])
//         .domain(data.map((d) => d.bucket))
//         .padding(0.15);
//
//   let bar_y = d3.scaleLinear()
//         .range([600, 0])
//         .domain(data.map((d) => d.count));
//
//   let g = svg.append('g').attr('transform', 'translate(' + 10 + ',' + 10 + ')');
//
//   g.append('g')
//         .attr('transform', 'translate(0,' + 20 + ')')
//         .call(d3.axisBottom(bar_x).tickValues([]))
//
//   g.selectAll('.bar')
//     .data(data)
//     .enter().append('rect')
//     .attr('id', (d) => 'bar-' + d.bucket)
//     .attr('class', 'bar')
//     .attr('fill', (d) => colorScale(d.bucket))
//     .attr('x', (d) => bar_x(d.bucket))
//     .attr('y', (d) => 600)
//     .attr('width', bar_x.bandwidth())
//     .transition()
//     .duration(500)
//     .attr('height', (d) => bar_y(d.count))
//     .attr('y', (d) => 600 - bar_y(d.count));
// }

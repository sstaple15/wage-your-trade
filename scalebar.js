function set_scalebar() {

  d3.select('#hist')
    .append('svg')
    .attr('id', 'histogram')
    .attr('height', 200)
    .attr('width', 450);

}

function update_scalebar(cty_jobs) {

  var scale_df = {};

  // first create a binned df for use in scalebar y
  // for loop for i counter = 0 -> 10, i++ adding 1 each run
  for (i = 0; i <= 10; i++) {
    scale_df[i] = {
      //eventually going to add interactivity by county 'id'
      'freq': 0
    };
};
  // compile into bins listing
  const jobDomain = computeDomain(cty_jobs, CURRENT_MET);

  Object.entries(cty_jobs).forEach(([id, value]) => {
    bin = Math.trunc((value.ind/jobDomain.max)*10);
    if (bin) {
      scale_df[bin].freq++;
    }
  });

  // now data to work with is scale_df
  var data = Object.entries(scale_df).map(([key, val]) => {
    return {'bin': +key, 'freq': +val.freq};
  });

  var histogram = d3.select('#histogram');

  // adapted from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
  var x = d3.scaleLinear()
      .domain(data.map((d) => d.bin))
      .rangeRound([10, 410]);

  var y = d3.scaleLinear()
      .domain(10, 0)
      .rangeRound([150, 0]);

  // var color = d3.scaleLinear()
  //     .domain([0,10])
  //     .range(['#fff', '#ffffd9', '#edf8b1', '#c7e9b4',
  //                 '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8',
  //                 '#253494', '#081d58']);

  var g = histogram.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,135)");

  g.append('g')
      .attr('transform', 'translate(0,135)')
      .call(d3.axisBottom(x)
              .tickValues([]))

  g.selectAll("rect")
    .data(data)
    .enter().append('rect')
    // .attr('fill', (d) => color(d.bin))
    .attr("height", (d) => {
      hgt = y(d.freq);
        return hgt;
    })
    .attr("x", (d) => x(d.bin))
    .attr('y', (d) => 150 - y(d.bin))
    .attr("width", x.bandwidth());

}
  // g.append("text")
  //     .attr("class", "caption")
  //     .attr("x", x.range()[0])
  //     .attr("y", 38)
  //     .attr("fill", "#555")
  //     .attr("text-anchor", "start")
  //     .attr('font-size', 12)
  //     .attr("font-weight", "bold")
  //     .text("Jobs Supported per 10,000 Employed");

function set_scalebar() {

  d3.select('#hist')
    .append('svg')
    .attr('id', 'histogram')
    .attr('height', 200)
    .attr('width', 450);

}

async function update_scalebar(cty_jobs) {

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
  // this isnt working for some reason?
  const jobDomain = computeDomain(cty_jobs, CURRENT_MET);

  Object.entries(cty_jobs).forEach(([id, value]) => {
    bin = Math.trunc((value.ind/jobDomain.max)*10);
    if (bin) {
      scale_df[bin].freq++;
    }
  });

  // now data to work with is scale_df
  var data = Object.entries(scale_df).map(([key, value]) => {
    return {'bin': +key, 'freq': +value.freq};
  });

  var histogram = d3.select('#histogram');

// THIS IS WHERE THINGS ARE BREAKING DOWN

  // adapted from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
  var x = d3.scaleBand()
      .domain(data.map((d) => d.bin))
      .rangeRound([0, 300]);

  var y = d3.scaleLinear()
      .domain(data.map((d) => d.freq), 0)
      .rangeRound([150, 0]);

  var color = d3.scaleThreshold()
       .domain([0,10])
       .range(['#fff', '#ffffd9', '#edf8b1', '#c7e9b4',
                   '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8',
                   '#253494', '#081d58']);

  var g = histogram.append("g")
      .attr("transform", "translate(10,10)");

  g.append('g')
      .attr('transform', 'translate(0,150)')
      .attr('class', 'axis')
      .call(d3.axisBottom(x)
              .ticks(10))
              // need to figure out what goes here

  g.selectAll("rect")
    .data(data)
    .enter().append('rect')
    // .attr('fill', (d) => color(d.bin)) //what is happening here?
    .attr("height", (d) => y(d.freq))
    .attr("x", (d) => x(d.bin) + 12)
    .attr('y', (d) => y(d.freq) - 5)
    .attr("width", 25);

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

function set_scalebar() {

  d3.select('#hist')
    .append('svg')
    .attr('id', 'histogram')
    .attr('height', 200)
    .attr('width', 425);

}

function update_scalebar(cty_jobs) {
// upon consultation with Justin Cohler
  var scale_df = {};

  // first create a binned df for use in scalebar y
  // for loop for i counter = 0 -> 10, i++ adding 1 each run
  for (i = 1; i <= 10; i++) {
    scale_df[i] = {
      //eventually going to add interactivity by county 'id'
      'freq': 0
    };
  };
  // compile into bins listing
  // const jobDomain = computeDomain(cty_jobs, CURRENT_MET);
  Object.entries(cty_jobs).forEach(([id, value]) => {
    bin = Math.trunc((value.ind/5000)*10);
    if (bin) {
      scale_df[bin].freq++;
    }
  });

  // now data to work with is scale_df
  var data = Object.entries(scale_df).map(([key, value]) => {
    return {'bin': +key*10, 'freq': +value.freq};
  });

  var histogram = d3.select('#histogram');

  // figure out max for scalebar scaling
  const histDomain = computeDomain(data, 'freq');

  // adapted from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
  var x = d3.scaleBand()
      .domain(data.map((d) => d.bin))
      .rangeRound([0, 400]);

  var y = d3.scaleLinear()
      .domain([histDomain.max, 0])
      .rangeRound([100, 0]);

  var color = d3.scaleLinear()
       .domain(data.map((d) => d.bin))
       .range(data.map((d) => d3.interpolateYlGnBu(d.bin * 0.01)));

  var g = histogram.append("g")
      .attr("transform", "translate(10,10)");

  d3.selectAll('.mainAxis').remove();
  g.append('g')
    .attr('transform', 'translate(17,150)')
    .attr('class', 'mainAxis')
    .call(d3.axisBottom(x)
      .ticks(10)
      .tickFormat((d) => d + "%"))
    .select('.domain')
      .remove();

  // FIX: gets rid of old bars, allows new bars to form
  d3.selectAll('rect').remove();

  g.selectAll("rect")
    .data(data)
    .enter().append('rect')
    .attr('fill', (d) => color(d.bin)) //what is happening here?
    .attr("height", (d) => y(d.freq + histDomain.max*.05))
    .attr("x", (d) => x(d.bin))
    .attr('y', (d) => 145 - y(d.freq))
    .attr("width", 38);

  g.append('line')
    .attr('transform', 'translate(0, 150)')
    .attr('stroke', 'black')
    .attr('x1', 0)
    .attr('x2', 398)
    .attr('y1', 0)
    .attr('y2', 0);

  d3.selectAll('.caption').remove();
  g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", 185)
    .attr("fill", "#555")
    .attr("text-anchor", "start")
    .attr('font-size', 12)
    .attr("font-weight", "bold")
    .text("Jobs Seriously Impacted by Tariffs");

}

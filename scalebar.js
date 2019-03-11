// adapted from https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1
async function scalebar(data) {
  const [cty_stuff] = data;

  let bar_df = {};
  breaks = 10
  for (i=0; i <= breaks; i++) {
    bar_df[i] = 0;
  }

  let maxed = computeDomain(data, "ag_jobs");
  var nbreaks = (max, val, buckets = 100) => Math.trunc(val/max*buckets);

  // create linear and color scales for choropleth
  const jobDomain = computeDomain(data, "ag_jobs");
  var cty_jobs = data.reduce((acc, row) => {
    acc[row.id] = row.ag_jobs;
    return acc;
  }, {});
  const jobScale = d3.scaleLinear().domain([0, jobDomain.max]).range([0,1])
  const colorScale = d => d3.interpolateYlGnBu(jobScale(d));

  Object.values(data)
    .map(d => nbreaks(maxed, d.ag_jobs, breaks))
    .forEach((d) => {
      bar_df[d] ? bar_df[d]++ : bar_df[d] = 1;
    });

  let bar_x = d3.scaleBand()
        .rangeRound([0, 600])
        .domain(data.map((d) => d.bucket))
        .padding(0.15);

  let bar_y = d3.scaleLinear()
        .range([600, 0])
        .domain(data.map((d) => d.count));

  let g = svg.append('g').attr('transform', 'translate(' + 10 + ',' + 10 + ')');

  g.append('g')
        .attr('transform', 'translate(0,' + 20 + ')')
        .call(d3.axisBottom(bar_x).tickValues([]))

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('id', (d) => 'bar-' + d.bucket)
    .attr('class', 'bar')
    .attr('fill', (d) => colorScale(d.bucket))
    .attr('x', (d) => bar_x(d.bucket))
    .attr('y', (d) => 600)
    .attr('width', bar_x.bandwidth())
    .transition()
    .duration(500)
    .attr('height', (d) => bar_y(d.count))
    .attr('y', (d) => 600 - bar_y(d.count));
}

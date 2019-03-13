// adapted from https://bl.ocks.org/adamjanes/6cf85a4fd79e122695ebde7d41fe327f
async function choropleth(data) {
  const [us, cty_stuff] = data;

  // create linear and color scales for choropleth
  const jobDomain = computeDomain(cty_stuff, "ag_jobs");
  var cty_jobs = cty_stuff.reduce((acc, d) => {
    acc[d.id] = { 'agr' : d.ag_jobs,
                  'man' : d.man_jobs,
                  'min' : d.min_jobs,
                  'edu' : d.ed_jobs,
                  'eng' : d.eng_jobs,
                  'bus' : d.bus_jobs,
                  'its' : d.it_jobs,
                  'fin' : d.fin_jobs };
    return acc;
  });
  const jobScale = d3.scaleLinear().domain([0, jobDomain.max]).range([0,1])
  const colorScale = d => d3.interpolateYlGnBu(jobScale(d));

  // create tooltip
  tip = d3.tip()
      .attr('class', 'hovtip')
      .offset([-10, 0])
      .direction('n')
      .html(function (d) {
        text = 'Supported Jobs Rate: ' + Math.round(cty_jobs[d.id].agr);
        return text;
  });
  svg.call(tip);

  // adapted from https://bl.ocks.org/adamjanes/6cf85a4fd79e122695ebde7d41fe327f
  svg.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
    .on('mouseover', function(d) {
      tip.show(d, this);
      d3.select(this).classed('active', true)
    })
    .on('mouseout', function(d) {
      tip.hide(d, this);
      d3.select(this).classed('active', false)
    })
    .attr("fill", (d) => {
      try {
        colorValue = colorScale(cty_jobs[d.id].agr);
      } catch {}
      return colorValue;
    })
    .attr("d", path);
    // .append("title");

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}

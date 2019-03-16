function set_choropleth(geoJSON) {
  d3.select('#chor')
    .append('svg')
    .attr('id', 'choropleth')
    .attr('height', 600)
    .attr('width', 960);

  let choropleth = d3.select('#choropleth');

  var path = d3.geoPath();
  // adapted from https://bl.ocks.org/adamjanes/6cf85a4fd79e122695ebde7d41fe327f
  choropleth.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(geoJSON, geoJSON.objects.counties).features)
    .enter().append("path")
    .attr("d", path)
    .attr('class', 'feature');

  choropleth.append("path")
      .datum(topojson.mesh(geoJSON, geoJSON.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}

function update_choropleth (cty_jobs) {

  let choropleth = d3.select('#choropleth');

  // create linear and color scales for choropleth
  const jobDomain = computeDomain(cty_jobs, CURRENT_MET);
  const jobScale = d3.scaleLinear().domain([0, jobDomain.max]).range([0,1])
  const colorScale = d => d3.interpolateYlGnBu(Math.sqrt(jobScale(d)));

  // create tooltip
  tip = d3.tip()
      .attr('class', 'hovtip')
      .offset([-10, 0])
      .direction('n')
      .html(function (d) {
        text = cty_jobs[d.id].cty +
          '<br/><strong>Total Jobs Rate: </strong>' + d3.format(',')(Math.round(cty_jobs[d.id][CURRENT_MET])) +
          '<br/>Agriculture: ' + d3.format(',')(Math.round(cty_jobs[d.id]['agr'])) +
          '<br/>Mining & Oil: ' + d3.format(',')(Math.round(cty_jobs[d.id]['min'])) +
          '<br/>Manufacture: ' + d3.format(',')(Math.round(cty_jobs[d.id]['man'])) +
          '<br/>Business: ' + d3.format(',')(Math.round(cty_jobs[d.id]['bus'])) +
          '<br/>Finance: ' + d3.format(',')(Math.round(cty_jobs[d.id]['fin'])) +
          '<br/>Info & Tech: ' + d3.format(',')(Math.round(cty_jobs[d.id]['its'])) +
          '<br/>Education: ' + d3.format(',')(Math.round(cty_jobs[d.id]['edu'])) +
          '<br/>Engineering: ' + d3.format(',')(Math.round(cty_jobs[d.id]['eng']));
        return text;
  });
  choropleth.call(tip);

  d3.selectAll('path')
    .on('mouseover', function(d) {
      tip.show(d, this);
      d3.select(this)
        .classed('counties active', true);
    })
    .on('mouseout', function(d) {
      tip.hide(d, this);
      d3.select(this)
        .classed('counties active', false);
    })
    .attr("fill", (d) => {
      try {
        colorValue = colorScale(cty_jobs[d.id][CURRENT_MET]);
      } catch {
          return colorScale(0);
      }
      return colorValue;
    })

}

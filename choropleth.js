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

async function update_choropleth (cty_jobs) {

  var choropleth = d3.select('#choropleth');

  // create linear and color scales for choropleth
  // const jobDomain = computeDomain(cty_jobs, CURRENT_MET);
  const jobScale = d3.scaleLinear().domain([0, 5000]).range([0,1])
  const colorScale = d => d3.interpolateYlGnBu(2*(jobScale(d)));

  // create tooltip
  tip = d3.tip()
      .attr('class', 'hovtip')
      .offset([-10, 0])
      .direction('n')
      .html(function (d) {
        text = cty_jobs[d.id].cty +
          '<br/><strong>Jobs Seriously Impacted: </strong>' + (Math.round(cty_jobs[d.id][CURRENT_MET])/100) + '%' +
          '<br/><strong>Breakdown by Industry (%): </strong>' +
          '<br/>Agriculture: ' + (Math.round(cty_jobs[d.id]['agr'])/100) +
          '<br/>Mining & Oil: ' + (Math.round(cty_jobs[d.id]['min'])/100) +
          '<br/>Manufacture: ' + (Math.round(cty_jobs[d.id]['man'])/100) +
          '<br/>Business: ' + (Math.round(cty_jobs[d.id]['bus'])/100) +
          '<br/>Finance: ' + (Math.round(cty_jobs[d.id]['fin'])/100) +
          '<br/>Info & Tech: ' + (Math.round(cty_jobs[d.id]['its'])/100) +
          '<br/>Education: ' + (Math.round(cty_jobs[d.id]['edu'])/100) +
          '<br/>Engineering: ' + (Math.round(cty_jobs[d.id]['eng'])/100) ;
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

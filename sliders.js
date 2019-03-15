// adapted from https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
var slider = d3
  .sliderHorizontal()
  .min(0)
  .max(1)
  .step(0.05)
  .width(180)
  .tickFormat(d3.format('5.0%'))
  .ticks(4)
  .default(0.2)
  .fill('#8B0000')
  .handle(d3.symbol()
     .type(d3.symbolCircle)
     .size(200)())
  .on('onchange', val => {
    update_scalars("SC_AGR", val);;
  });

d3.select('#slider')
  .append('svg')
  .attr('width', 210)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(10,10)')
  .call(slider);

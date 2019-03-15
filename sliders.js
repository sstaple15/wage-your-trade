// adapted from https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518

// For SC_AGR
var slider_a = d3
  .sliderHorizontal()
  .min(0)
  .max(1)
  .step(0.05)
  .width(180)
  .tickFormat(d3.format('5.0%'))
  .ticks(4)
  .default(0.3)
  .fill('#8B0000')
  .handle(d3.symbol()
     .type(d3.symbolCircle)
     .size(200)())
  .on('onchange', val => {
    update_scalars("SC_AGR", val);;
  });

d3.select('#slider_a')
  .append('svg')
  .attr('width', 210)
  .attr('height', 45)
  .append('g')
  .attr('transform', 'translate(10,10)')
  .call(slider_a);

// For SC_MIN
var slider_b = d3
  .sliderHorizontal()
  .min(0)
  .max(1)
  .step(0.05)
  .width(180)
  .tickFormat(d3.format('5.0%'))
  .ticks(4)
  .default(0.05)
  .fill('#8B0000')
  .handle(d3.symbol()
     .type(d3.symbolCircle)
     .size(200)())
  .on('onchange', val => {
    update_scalars("SC_MIN", val);;
  });

d3.select('#slider_b')
  .append('svg')
  .attr('width', 210)
  .attr('height', 45)
  .append('g')
  .attr('transform', 'translate(10,10)')
  .call(slider_b);

// For SC_MAN
var slider_c = d3
  .sliderHorizontal()
  .min(0)
  .max(1)
  .step(0.05)
  .width(180)
  .tickFormat(d3.format('5.0%'))
  .ticks(4)
  .default(0.25)
  .fill('#8B0000')
  .handle(d3.symbol()
    .type(d3.symbolCircle)
    .size(200)())
  .on('onchange', val => {
    update_scalars("SC_MAN", val);;
  });

d3.select('#slider_c')
  .append('svg')
  .attr('width', 210)
  .attr('height', 45)
  .append('g')
  .attr('transform', 'translate(10,10)')
  .call(slider_c);

  // For SC_BUS
  var slider_d = d3
    .sliderHorizontal()
    .min(0)
    .max(1)
    .step(0.05)
    .width(180)
    .tickFormat(d3.format('5.0%'))
    .ticks(4)
    .default(0)
    .fill('#8B0000')
    .handle(d3.symbol()
       .type(d3.symbolCircle)
       .size(200)())
    .on('onchange', val => {
      update_scalars("SC_BUS", val);;
    });

  d3.select('#slider_d')
    .append('svg')
    .attr('width', 210)
    .attr('height', 45)
    .append('g')
    .attr('transform', 'translate(10,10)')
    .call(slider_d);

    // For SC_FIN
    var slider_e = d3
      .sliderHorizontal()
      .min(0)
      .max(1)
      .step(0.05)
      .width(180)
      .tickFormat(d3.format('5.0%'))
      .ticks(4)
      .default(0)
      .fill('#8B0000')
      .handle(d3.symbol()
         .type(d3.symbolCircle)
         .size(200)())
      .on('onchange', val => {
        update_scalars("SC_FIN", val);;
      });

    d3.select('#slider_e')
      .append('svg')
      .attr('width', 210)
      .attr('height', 45)
      .append('g')
      .attr('transform', 'translate(10,10)')
      .call(slider_e);

      // For SC_ITS
      var slider_f = d3
        .sliderHorizontal()
        .min(0)
        .max(1)
        .step(0.05)
        .width(180)
        .tickFormat(d3.format('5.0%'))
        .ticks(4)
        .default(0)
        .fill('#8B0000')
        .handle(d3.symbol()
           .type(d3.symbolCircle)
           .size(200)())
        .on('onchange', val => {
          update_scalars("SC_ITS", val);;
        });

      d3.select('#slider_f')
        .append('svg')
        .attr('width', 210)
        .attr('height', 45)
        .append('g')
        .attr('transform', 'translate(10,10)')
        .call(slider_f);

        // For SC_EDU
        var slider_g = d3
          .sliderHorizontal()
          .min(0)
          .max(1)
          .step(0.05)
          .width(180)
          .tickFormat(d3.format('5.0%'))
          .ticks(4)
          .default(0)
          .fill('#8B0000')
          .handle(d3.symbol()
             .type(d3.symbolCircle)
             .size(200)())
          .on('onchange', val => {
            update_scalars("SC_EDU", val);;
          });

        d3.select('#slider_g')
          .append('svg')
          .attr('width', 210)
          .attr('height', 45)
          .append('g')
          .attr('transform', 'translate(10,10)')
          .call(slider_g);

          // For SC_ENG
          var slider_h = d3
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
              update_scalars("SC_ENG", val);;
            });

          d3.select('#slider_h')
            .append('svg')
            .attr('width', 210)
            .attr('height', 45)
            .append('g')
            .attr('transform', 'translate(10,10)')
            .call(slider_h);

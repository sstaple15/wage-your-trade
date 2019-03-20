var countySet = {};

function make_search(cty_stuff) {

  var countyPossible = {};
  var countyPossible = cty_stuff.cty_name;
  console.log(countyPossible);

  // info for searchlist
  d3.select('#countyList')
    .selectAll('option')
    .data(cty_stuff)
    .enter().append('option')
    .attr('value', function (d) {
      return d.cty_name;
    });

  // then, handle the searchbar function in countyListForm
  d3.select('#countyListForm')
    .on('submit', function () {
      var searched = document.getElementById('searchbar').value
      searcher(searched);
      document.getElementById('countyListForm')
        .reset()
    });

  function searcher (searched) {
    if (countyPossible.includes(searched)) {
      countySet.add(searched);
      console.log(countySet);
      // searcherHandler(countySet);
    }
  }

  // this is going to be how I set tooltip
  // function searcherHandler (set) {
  //   listValues = Array.from(set)
  // }

  // reset button functionality
  d3.select("#reset")
    .style("cursor", "pointer")
    .on("click", function() {
      countySet.clear();
      searcherHandler(countySet);
    });

}

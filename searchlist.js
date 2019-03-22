  var countyList = new Set();

function make_search(cty_stuff) {

  // create countySet
  var countySet = [];
  Object.entries(cty_stuff).forEach(([id, value]) => {
    cty = String(value.cty);
    countySet.push(cty);
  });

  // connect to searchbar
  d3.select('#countyList')
    .selectAll('option')
    .data(countySet)
    .join('option')
    .attr('value', function(d) { return d; });

  d3.select('#countyListForm')
    .on("submit", function() {
      var searched = document.getElementById('searchbar').value;
      countyList.add(searched);
      findCounty(countyList);
      document.getElementById('searchbar').value = '';
    });

  function findCounty(set) {
    listValues = Array.from(set);
    console.log(String(listValues));
    Object.entries(cty_stuff).forEach(([id, value]) => {
      cty = String(value.cty);
      if (cty == listValues) {
        console.log('true');
      }
    });
  }

  // reset button functionality
  d3.select("#reset")
    .style("cursor", "pointer")
    .on("click", function() {
      countyList.clear();
      findCounty(countyList);
    });

}

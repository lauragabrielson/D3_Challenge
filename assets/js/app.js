
// set height, width and margins
var svgWidth = 1200;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create SVG, ppend to hold chart and shift,
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial axis
var chosenXAxis = "obesity";

// update x-scale upon click 
function xScale(stateData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenXAxis]) * .99,
      d3.max(stateData, d => d[chosenXAxis]) * 1
    ])
    .range([0, width]);

  return xLinearScale;

}

// update xAxis upon click
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// update circles group with transition
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// update circle labels with transition
function renderLabels(circleLabels, newXScale, chosenXAxis) {

  circleLabels.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));
    
  return circleLabels;
}


// update circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "obese") {
    label = "Obesity";
  }
  else if (chosenXAxis === "poverty") {
    label = "Poverty";
  }
  else if (chosenXAxis === "smoking") {
    label = "Smoking";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-8, 0])
    .style("background-color", "cornflowerblue")
    .style("position", "absolute")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")	
    .html(d => `<strong>${d.state}</strong> <br>${chosenXAxis}: ${d[chosenXAxis]}% <br> lacks healthcare: ${d.healthcare}%`);

  circlesGroup.call(toolTip);

  // mouse events
circlesGroup.on("mouseover", toolTip.show)
    
    .on("mouseout", toolTip.hide)
    .on("mousemove", toolTip.show);

  return circlesGroup;
}

// retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(stateData, err) {
  if (err) throw err;

  // parse data
  stateData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.smoking = +data.smokes;
  });

  // create x and y function 
  var xLinearScale = xScale(stateData, chosenXAxis);

  var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

  // create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "cornflowerblue")
    .attr("opacity", ".5")
  
// append circle labels with state abbreviations
  let circleLabels = chartGroup.selectAll(null)
    .data(stateData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("font-family", "futura")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");
     
  // create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var obesityLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "obesity") // value to grab for event listener
    .classed("active", true)
    .text("Obesity");

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "poverty") // value to grab for event listener
    .classed("inactive", true)
    .text("Poverty");

 var smokesLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "smoking") // value to grab for event listener
    .classed("inactive", true)
    .text("Smoking");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare");

  // updateToolTip function 
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // updates x scale for new data
        xLinearScale = xScale(stateData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, circleLabels);

        //****** */ update circle labels
        circleLabels = renderLabels(circleLabels, xLinearScale, chosenXAxis)

        // updates tooltips with new information
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text on graph
        if (chosenXAxis === "obesity") {
          obesityLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);

        }
        else if (chosenXAxis === "poverty") {
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
        }
        else if (chosenXAxis === "smoking") {
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
          } 
      }
    });
}).catch(function(error) {
  console.log(error);
});



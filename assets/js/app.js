// var svgWidth = 1100;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// var chosenXAxis = "obesity";

// // function used for updating x-scale var upon click on axis label
// function xScale(stateData, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d[chosenXAxis]) * .98,
//       d3.max(stateData, d => d[chosenXAxis]) * 1
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// // 
// // 

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   var label;

//   if (chosenXAxis === "obesity") {
//     label = "High Obesity:";
//   }
//   else {
//     label = "Poverty";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([-8, 0])
//     .html(d => `<strong>${d.state}</strong> <br>${chosenXAxis}: ${d[chosenXAxis]}%`);

//   circlesGroup.call(toolTip);

// circlesGroup.on("mouseover", toolTip.show)
//     // onmouseout event
//     .on("mouseout", toolTip.hide);

//   return circlesGroup;
// }
// //   circlesGroup.on("mouseover", function(data) {
// //     toolTip.show(data);
// //   })
// //     // onmouseout event
// //     .on("mouseout", function(data, index) {
// //       toolTip.hide(data);
// //     });

// //   return circlesGroup;
// // }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/data.csv").then(function(stateData, err) {
//   if (err) throw err;

//   // parse data
//   stateData.forEach(function(data) {
//     data.healthcare = +data.healthcareLow;
//     data.obesity = +data.obesityHigh;
//     data.poverty = +data.poverty;
//     data.smokes = + data.smokes
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(stateData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(stateData, d => d.healthcare)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", 12)
//     .attr("fill", "lightblue")
//     .attr("opacity", ".5")
  
   
//     // .append("text")
//     //     .attr("dx", d => xLinearScale(d[chosenXAxis]))
//     //     .attr("dy", d => yLinearScale(d.healthcareLow))
//     //     .classed("stateText", true)
//     //     .attr("font-size", parseInt(r*0.8))
//     //     .text(d => d.abbr);

// // var labels = chartGroup.append("text")
// //     .style("text-anchor", "middle")
// //     .style("font-size", "12px")
// //     .selectAll("tspan")
// //     .data(stateData)
// //     .enter()
// //     .append("tspan")
// //         .attr("x", function(data) {
// //             return xLinearScale(d[chosenXAxis]);
// //         })
// //         .attr("y", function(data) {
// //             return yLinearScale(data.healthcareLow);
// //         })
// //         .text(function(data) {
// //             return data.abbr
// //         });
    
    

//   // Create group for two x-axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var obesityLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "obesity") // value to grab for event listener
//     .classed("active", true)
//     .text("Obesity");

//   var povertyLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "poverty") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Poverty");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Low Healthcare");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(stateData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "obesity") {
//           obesityLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });






///

var svgWidth = 1100;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(stateData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenXAxis]) * .98,
      d3.max(stateData, d => d[chosenXAxis]) * 1
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// 


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "obesity") {
    label = "Obese:";
  }
  else if (chosenXAxis === "poverty") {
    label = "In Poverty";
  }
  else if (chosenXAxis === "smokes") {
    label = "Smokes";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-8, 0])
    .html(d => `<strong>${d.state}</strong> <br>${chosenXAxis}: ${d[chosenXAxis]}% <br> healthcare: ${d.healthcare}%`);

  circlesGroup.call(toolTip);

circlesGroup.on("mouseover", toolTip.show)
    // onmouseout event
    .on("mouseout", toolTip.hide);

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(stateData, err) {
  if (err) throw err;

  // parse data
  stateData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.smokes = +data.smokes;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(stateData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

  // Create initial axis functions
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
    .attr("r", 10)
    .attr("fill", "lightblue")
    .attr("opacity", ".5")
  

//   var circleLabels = chartGroup.selectAll(null).data(stateData).enter().append("text");

//   circleLabels
//       .attr("cx", d => xLinearScale(d[chosenXAxis]))
//       .attr("cy", d => yLinearScale(d.healthcare))
//       .text(d => d.abbr)
//     //   .attr("x", function(d) {
//     //     return xLinearScale(d.poverty);
//     //   })
//     //   .attr("y", function(d) {
//     //     return yLinearScale(d.healthcare);
//     //   })
//     //   .text(function(d) {
//     //     return d.abbr;
//     //   })
//       .attr("font-family", "sans-serif")
//       .attr("font-size", "10px")
//       .attr("text-anchor", "middle")
//       .attr("fill", "white");

//   chartGroup.selectAll(null)
//     .append("text")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .text(d => d.abbr)
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "10px")
//     .attr("text-anchor", "middle")
//     .attr("fill", "white");
    
    //  var circleLabels = chartGroup.selectAll(null)
    // // .attr("dx", function (d) { return 25 })
    // .text(function (d) { return d.abbr })
    // // .attr("stroke", "black")
    // // .classed("stateText", true)
    // .attr("font-size", parseInt(r*0.99))
    // .text(function (d) { return d.abbr })


    .append("text")
        .attr("dx", d => xLinearScale(d[chosenXAxis]))
        .attr("dy", d => yLinearScale(d.healthcareLow))
        // .classed("stateText", true)
        .attr("font-size", parseInt(r*0.8))
        .text(d => d.abbr);

// chartGroup.append("text")
//     .style("text-anchor", "middle")
//     .style("font-size", "12px")
//     .selectAll("tspan")
//     .data(stateData)
//     .enter()
//     .append("tspan")
//         .attr("x", function(data) {
//             return xLinearScale(d[chosenXAxis]);
//         })
//         .attr("y", function(data) {
//             return yLinearScale(data.healthcareLow);
//         })
//         .text(function(data) {
//             return data.abbr
//         });
    
    

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var obesityLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "obesity") // value to grab for event listener
    .classed("active", true)
    .text("Obese");

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "poverty") // value to grab for event listener
    .classed("inactive", true)
    .text("In Poverty");

 var smokesLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare");

  // updateToolTip function above csv import
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

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(stateData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
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
        else if (chosenXAxis === "smokes") {
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


// var svgWidth = 1100;
// var svgHeight = 600;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// var chosenXAxis = "obesity";

// // function used for updating x-scale var upon click on axis label
// function xScale(stateData, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d[chosenXAxis]) * .98,
//       d3.max(stateData, d => d[chosenXAxis]) * 1
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// // 


// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   var label;

//   if (chosenXAxis === "obesity") {
//     label = "Obese:";
//   }
//   else if (chosenXAxis === "poverty") {
//     label = "In Poverty";
//   }
//   else if (chosenXAxis === "smokes") {
//     label = "Smokes";
//   }
//   else if (chosenXAxis === "income") {
//     label = "Income";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([-8, 0])
//     .html(d => `<strong>${d.state}</strong> <br>${chosenXAxis}: ${d[chosenXAxis]}% <br> healthcare: ${d.healthcare}%`);

//   circlesGroup.call(toolTip);

// circlesGroup.on("mouseover", toolTip.show)
//     // onmouseout event
//     .on("mouseout", toolTip.hide);

//   return circlesGroup;
// }
// //   circlesGroup.on("mouseover", function(data) {
// //     toolTip.show(data);
// //   })
// //     // onmouseout event
// //     .on("mouseout", function(data, index) {
// //       toolTip.hide(data);
// //     });

// //   return circlesGroup;
// // }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/data.csv").then(function(stateData, err) {
//   if (err) throw err;

//   // parse data
//   stateData.forEach(function(data) {
//     data.healthcare = +data.healthcare;
//     data.obesity = +data.obesity;
//     data.poverty = +data.poverty;
//     data.smokes = +data.smokes;
//     data.income = +data.income;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(stateData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(stateData, d => d.healthcare)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", 10)
//     .attr("fill", "lightblue")
//     .attr("opacity", ".5")
//     // .append("text")
//     //     .attr("dx", d => xLinearScale(d[chosenXAxis]))
//     //     .attr("dy", d => yLinearScale(d.healthcareLow))
//     //     .classed("stateText", true)
//     //     .attr("font-size", parseInt(r*0.8))
//     //     .text(d => d.abbr);

// // chartGroup.append("text")
// //     .style("text-anchor", "middle")
// //     .style("font-size", "12px")
// //     .selectAll("tspan")
// //     .data(stateData)
// //     .enter()
// //     .append("tspan")
// //         .attr("x", function(data) {
// //             return xLinearScale(d[chosenXAxis]);
// //         })
// //         .attr("y", function(data) {
// //             return yLinearScale(data.healthcareLow);
// //         })
// //         .text(function(data) {
// //             return data.abbr
// //         });
    
    

//   // Create group for two x-axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var obesityLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "obesity") // value to grab for event listener
//     .classed("active", true)
//     .text("Obese");

//   var povertyLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "poverty") // value to grab for event listener
//     .classed("inactive", true)
//     .text("In Poverty");

//  var smokesLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 60)
//     .attr("value", "smokes") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Smokes");

// var incomeLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 80)
//     .attr("value", "income") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Income");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Lacks Healthcare");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(stateData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "obesity") {
//           obesityLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           smokesLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
            

        
//         }
//         else if (chosenXAxis === "poverty") {
//           obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           smokesLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else if (chosenXAxis === "smokes") {
//             obesityLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             povertyLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             smokesLabel
//               .classed("active", true)
//               .classed("inactive", false);
//             incomeLabel
//               .classed("active", false)
//               .classed("inactive", true);
//           }
//           else if (chosenXAxis === "income") {
//             obesityLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             povertyLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             smokesLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             incomeLabel
//               .classed("active", true)
//               .classed("inactive", false);
//           }
        
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });






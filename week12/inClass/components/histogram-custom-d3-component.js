const React = require('react'); // javascript library for interaction
const D3Component = require('idyll-d3-component'); // to interface with d3.js
const d3 = require('d3'); // to use the d3 functions

// const size = 500; // setting the base size of the canvas

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom; // note: right now, width/height are fixed?

// this class name matches with the call in the index.idyll file
class HistogramCustomD3Component extends D3Component {
    
    initialize(node, props) { // "initialize" sets up initial canvas

	// Parse the date / time
	var parseDate = d3.isoParse;

	var x = d3.scaleBand().rangeRound([0, width], .05).padding(0.1);

	var y = d3.scaleLinear().range([height, 0]);

	var xAxis = d3.axisBottom()
	    .scale(x)
	    .tickFormat(d3.timeFormat("%b"));

	var yAxis = d3.axisLeft()
	    .scale(y)
	    .ticks(10);

	// setting up the canvas object
	const svg = (this.svg = d3.select(node).append('svg'));
	// drawing the background canvas
	svg 
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform",
		  "translate(" + margin.left + "," + margin.top + ")");

	// reading in data and plotting
	// goal: do a bar plot with our data -- years vs. corgis born in the United States
	d3.csv("https://raw.githubusercontent.com/UIUC-iSchool-DataViz/spring2020/master/week14/bar-data.csv", function(error, data) { // note our data is called "data"

	    // practice investigating data:
	    console.log(Object.keys(data)); // what attributes in our dataset
	    console.log(data.columns); 

	    
	    // for each row in data, do something with the date
	    data.forEach(function(d) {
		d.date = parseDate(d.date);
		//console.log(d.date); // like print in Python
		d.value = +d.value;
	    });

	    // setting the range of x/y axis
	    x.domain(data.map(function(d) { return d.date; }));
	    y.domain([0, d3.max(data, function(d) { return d.value; })]);

	    // drawing the x-axis
	    svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis.ticks(null).tickSize(0))
		.selectAll("text")
		.style("text-anchor", "middle")

	    // drawing the y-axis
	    svg.append("g")
		.attr("class", "y axis")
		.call(yAxis.ticks(null).tickSize(0))
		.append("text")
		.attr("y", 6)
		.style("text-anchor", "middle")
		.text("Value");

	    // drawing bars of bar chart
	    svg.selectAll("bar")
		.data(data)
		.enter().append("rect")
	    // .style("fill", function(d){ return d.value < d.target ? '#EF5F67': '#3FC974'})
	        .attr("fill", '#3FC974')
		.attr("x", function(d) { return x(d.date); })
		.attr("width", x.bandwidth())
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); });

	    // drawing the dashed lines
	    //svg.selectAll("lines")
		//.data(data)
		//.enter().append("line")
		//.style("fill", 'none')
  		//.attr("x1", function(d) { return x(d.date) + x.bandwidth()+5; })
		//.attr("x2", function(d) { return x(d.date)-5; })
		//.attr("y1", function(d) { return y(d.target); })
		//.attr("y2", function(d) { return y(d.target); })
  		//.style("stroke-dasharray", [2,2])
  		//.style("stroke", "#000000")
		//.style("stroke-width", 2)
	    
	});

  }

  //update(props, oldProps) { // this "update" function is needed to change the plot
  //  this.svg // selecting the "current" svg drawing
  //    .selectAll('circle') // of the drawing, pick out the circle element
  //    .transition() // transition between states
  //    .duration(750) // 750 milliseconds between old and new states
  //    .attr('cx', Math.random() * size) // update the x attribute of circle randomly
  //    .attr('cy', Math.random() * size); // update the y attribute of circle randomly
  //}
}

module.exports = HistogramCustomD3Component; // this name is the same as the
// class name and also what we call in the index.idyll file

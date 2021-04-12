const React = require('react'); // javascript library for interaction
const D3Component = require('idyll-d3-component'); // to interface with d3.js
const d3 = require('d3'); // to use the d3 functions

// const size = 500; // setting the base size of the canvas

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
	
    const svg = (this.svg = d3.select(node).append('svg')); // think: "div" in vega-lite
    svg
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform",
		  "translate(" + margin.left + "," + margin.top + ")");


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

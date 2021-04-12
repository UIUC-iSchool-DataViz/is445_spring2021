const React = require('react'); // javascript library for interaction
const D3Component = require('idyll-d3-component'); // to interface with d3.js
const d3 = require('d3'); // to use the d3 functions

const size = 600; // setting the base size of the canvas

// this class name matches with the call in the index.idyll file
class CustomD3Component extends D3Component {
    
  initialize(node, props) { // "initialize" sets up initial canvas
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg
      .append('circle')
      .attr('r', 20)
      .attr('cx', Math.random() * size)
      .attr('cy', Math.random() * size);
  }

  update(props, oldProps) { // this "update" function is needed to change the plot
    this.svg
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', Math.random() * size)
      .attr('cy', Math.random() * size);
  }
}

module.exports = CustomD3Component; // this name is the same as the
// class name and also what we call in the index.idyll file

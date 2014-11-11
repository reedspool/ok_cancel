/*- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -~- -*/
/*
/* Directed graph in d3
/*
/* TODO: Make this a angular thing. Service maybe?
/*
/* Author: [Reed](https://github.com/reedspool)
/*
/*- -~- -*/

d3.directed_graph = function makeGraph(d3, game) {
		
	// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/
	// var links = [
	//   {source: "Microsoft", target: "Amazon", type: "licensing"},
	//   {source: "Microsoft", target: "HTC", type: "licensing"},
	//   {source: "Samsung", target: "Apple", type: "suit"},
	//   {source: "Motorola", target: "Apple", type: "suit"},
	// ];

	var links = [];

	// Translate game places into links
	angular.forEach(game.places, function (place) {
		if (place.OK) {
			links.push({
				source: place.NAME,
				target: place.OK,
				type: 'ok',
				text: place.text
			})
		}

		if (place.CANCEL) {
			links.push({
				source: place.NAME,
				target: place.CANCEL,
				type: 'cancel',
				text: place.text
			})
		}
	})

	var nodes = {};

	// Compute the distinct nodes from the links.
	angular.forEach(links, function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

	var width = 400,
	    height = 330;


	function linkArc(d) {
	  var dx = d.target.x - d.source.x,
	      dy = d.target.y - d.source.y,
	      dr = Math.sqrt(dx * dx + dy * dy);
	  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	}
	/* adapted from http://bl.ocks.org/mbostock/1153292 */

	function transform(d) {
	  return "translate(" + d.x + "," + d.y + ")";
	}
	// Static vars

	function factory() {
		// Instance vars
		var focus;

		function chart(holder) {
						
			var force = d3.layout.force()
			    .nodes(d3.values(nodes))
			    .links(links)
			    .size([width, height])
			    .linkDistance(120)
			    .charge(-1000)
			    .on("tick", tick)
			    .start();

	
			// Use elliptical arc path segments to doubly-encode directionality.
			function tick() {
			  path.attr("d", linkArc);
			  circle.attr("transform", transform);
			  text.attr("transform", transform);
			}

			var svg = holder.append("svg")
			    .attr("width", width)
			    .attr("height", height);

			// Per-type markers, as they don't inherit styles.
			svg.append("defs").selectAll("marker")
			    .data(["cancel", "ok"])
			  .enter().append("marker")
			    .attr("id", function(d) { return d; })
			    .attr("viewBox", "0 -5 10 10")
			    .attr("refX", 15)
			    .attr("refY", -1.5)
			    .attr("markerWidth", 6)
			    .attr("markerHeight", 6)
			    .attr("orient", "auto")
			  .append("path")
			    .attr("d", "M0,-5L10,0L0,5");

			var path = svg.append("g").selectAll("path")
			    .data(force.links(), 
			    	function (d, i) { return i })
			  .enter().append("path")
			    .attr("class", function(d) { return "link " + d.type; })
			    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

			var circle = svg.append("g").selectAll("circle")
			    .data(force.nodes(), function (d) { return d.name })
			  .enter().append("circle")
			    .attr("r", 6)
		    	.classed('focus', function (d) { return d.name == focus; })
			    .call(force.drag);

			var text = svg.append("g").selectAll("text")
			    .data(force.nodes(), function (d) { return d.name })
			  .enter().append("text")
			    .attr("x", 8)
			    .attr("y", ".31em")
		    	.classed('focus', function (d) { return d.name == focus; })
			    .text(function(d) { return d.name; });


		}

		// Chart attributes
		chart.focus = function(value) {
			if (!arguments.length) return focus;
			focus = value;
			return chart;
		};

		return chart;
	}

	return factory
}
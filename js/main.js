require.config({
	paths: {
		'2014budget' : '../resources/2014budget',
		chart: './chart',
		'jquery-dethrottle': './jquery.ba-throttle-debounce'
	},
    shim: {
	    stativus: {
			exports: 'Stativus'
	    },
	    underscore: {
			exports: '_'
	    },
		backbone: {
			deps: ['underscore', 'jquery'],
		    exports: 'Backbone'
	    },
	    d3: {
            exports: 'd3'
        }
	}
});

	//the 'main' function 
require(['jquery', 'underscore', 
	'backbone', 'q',
	'd3', '2014budget', 'chart'],
	function ($, _, Backbone, Q, d3, budget, chart) {
 		log = function (m) { console.log(m) };
        
        chart.setup(budget);

		log('hello world')
 		log(chart)
 		log(budget)
 		log(d3)
	});

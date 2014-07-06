/*

	ractive-decorators-selectize
	===============================================

	Version 0.1.0.

	This plugin is a decorator for Selectize.js inspired by @sandermarechal's Select2 plugin.

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/ractive.js'></script>
	    <script src='lib/ractive-decorators-selectize.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'ractive-decorators-selectize' );

	<< more specific instructions for this plugin go here... >>

*/

(function ( global, factory ) {

	'use strict';

	// AMD environment
	if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive' ], factory );
	}

	// Common JS (i.e. node/browserify)
	else if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ) );
	}

	// browser global
	else if ( global.Ractive && global.jQuery ) {
		factory( global.Ractive, global.jQuery );
	}

	else {
		throw new Error( 'Could not find Ractive or jQuery! They must be loaded before the ractive-decorators-selectize plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, $ ) {

	'use strict';

	var selectizeDecorator = function ( node, type ) {
		var ractive = node._ractive.root,
			keypath = node._ractive.binding ? node._ractive.binding.keypath : false,
			observer,
			types = selectizeDecorator.types,
			setting = false;

		if (!types.hasOwnProperty('default')) {
			types.default = {};
		}

		var options = (type && types.hasOwnProperty(type)) ? types[type] : types['default'];
		if (typeof options === 'function') {
			options = options.call(this, node);
		}

		$(node).selectize(options).on('change', function () {
			if (!setting) {
				setting = true;
				ractive.updateModel();
				setting = false;
			}
		});

		if (keypath) {
			observer = ractive.observe(keypath, function ( newValue ) {
				if (!setting) {
					setting = true;
					node.selectize.setValue(newValue);
					setting = false;
				}
			});
		}

		return {
			teardown: function () {
				node.selectize.destroy();
				if (observer) {
					observer.cancel();
				}
			}
		};
	};

	selectizeDecorator.types = {};

	Ractive.decorators.selectize = selectizeDecorator;
}));

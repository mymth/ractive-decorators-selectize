(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.selectizeDecorator = factory());
}(this, (function () { 'use strict';

/*

  ractive-decorators-selectize
  ===============================================

  Version <%= pkg.version %>.

  This plugin is a decorator for Selectize.js.

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

*/

var selectizeDecorator = function selectizeDecorator(node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

  var keypath = node._ractive.binding ? node._ractive.binding.model.key : false;
  var types = selectizeDecorator.types;
  var options = types.hasOwnProperty(type) ? types[type] : types['default'];
  var observer = void 0;
  var setting = false;

  $(node).selectize(options).on('change', function () {
    if (!setting) {
      setting = true;
      _this.updateModel();
      setting = false;
    }
  });

  if (keypath) {
    observer = this.observe(keypath, function (newValue) {
      if (!setting) {
        setting = true;
        node.selectize.setValue(newValue);
        setting = false;
      }
    });
  }

  return {
    teardown: function teardown() {
      node.selectize.destroy();
      if (observer) {
        observer.cancel();
      }
    }
  };
};

selectizeDecorator.types = {
  default: {}
};

return selectizeDecorator;

})));

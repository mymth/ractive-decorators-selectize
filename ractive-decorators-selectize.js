/*
  ractive-decorators-selectize
  ===============================================

  Version 0.2.0.

  This plugin is a decorator for Selectize.js.

  ==========================
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive'), require('jquery')) :
	typeof define === 'function' && define.amd ? define(['ractive', 'jquery'], factory) :
	(global.selectizeDecorator = factory(global.Ractive,global.$));
}(this, (function (Ractive,$) { 'use strict';

Ractive = 'default' in Ractive ? Ractive['default'] : Ractive;
$ = 'default' in $ ? $['default'] : $;

var selectizeDecorator = function selectizeDecorator(node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

  var keypath = Ractive.getNodeInfo(node).getBindingPath();
  var types = selectizeDecorator.types;
  var options = types.hasOwnProperty(type) ? types[type] : types.default;
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

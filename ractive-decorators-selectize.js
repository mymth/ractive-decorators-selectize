/*
  ractive-decorators-selectize
  ===============================================

  Version 0.2.1.

  This plugin is a decorator for Selectize.js.

  ==========================
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.selectizeDecorator = factory(global.$));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var selectizeDecorator = function selectizeDecorator(node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

  var keypath = this.getContext(node).getBindingPath();
  var types = selectizeDecorator.types;
  var options = types.hasOwnProperty(type) ? types[type] : types.default;
  var obsHandle = void 0;
  var setting = false;

  $(node).selectize(options).on('change', function () {
    if (setting) {
      return;
    }

    setting = true;
    _this.updateModel();
    setting = false;
  });

  if (keypath) {
    obsHandle = this.observe(keypath, function (newValue) {
      if (setting) {
        return;
      }

      setting = true;
      node.selectize.setValue(newValue);
      setting = false;
    });
  }

  return {
    teardown: function teardown() {
      node.selectize.destroy();
      if (obsHandle) {
        obsHandle.cancel();
      }
    }
  };
};

selectizeDecorator.types = {
  default: {}
};

return selectizeDecorator;

})));

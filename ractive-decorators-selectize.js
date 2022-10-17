/*
  ractive-decorators-selectize
  ===============================================

  Version 0.3.0.

  This plugin is a decorator for Selectize.js.

  ==========================
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.selectizeDecorator = factory(global.$));
})(this, (function ($) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  const selectizeDecorator = function selectizeDecorator(node, type = 'default') {
    const keypath = this.getContext(node).getBindingPath();
    const types = selectizeDecorator.types;
    const options = types.hasOwnProperty(type) ? types[type] : types.default;
    let obsHandle;
    let setting = false;

    $__default["default"](node).selectize(options);

    if (keypath) {
      node.selectize.on('change', () => {
        if (setting) {
          return;
        }

        setting = true;
        this.updateModel(keypath);
        setting = false;
      });

      obsHandle = this.observe(keypath, (newValue) => {
        if (setting) {
          return;
        }

        setting = true;
        node.selectize.setValue(newValue);
        setting = false;
      });
    }

    return {
      teardown() {
        node.selectize.destroy();
        if (obsHandle) {
          obsHandle.cancel();
        }
      }
    };
  };

  selectizeDecorator.types = {
    default: {},
  };

  return selectizeDecorator;

}));

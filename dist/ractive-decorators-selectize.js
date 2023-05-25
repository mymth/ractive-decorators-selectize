/*
  ractive-decorators-selectize
  ===============================================

  Version 0.4.0.

  This plugin is a decorator for Selectize.js.

  ==========================
*/

var selectizeDecorator = (function () {
  'use strict';

  function selectizeDecorator(node, type = 'default') {
    const keypath = this.getContext(node).getBindingPath();
    const types = selectizeDecorator.types;
    const options = types[type] || types.default;
    let obsHandle;
    let setting = false;

    $(node).selectize(options);

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
  }
  selectizeDecorator.types = {
    default: {},
  };

  return selectizeDecorator;

})();

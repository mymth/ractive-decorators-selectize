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

const selectizeDecorator = function (node, type = 'default') {
  const keypath = node._ractive.binding ? node._ractive.binding.model.key : false;
  const types = selectizeDecorator.types;
  const options = types.hasOwnProperty(type) ? types[type] : types['default'];
  let observer;
  let setting = false;

  $(node).selectize(options).on('change', () => {
    if (!setting) {
      setting = true;
      this.updateModel();
      setting = false;
    }
  });

  if (keypath) {
    observer = this.observe(keypath, (newValue) => {
      if (!setting) {
        setting = true;
        node.selectize.setValue(newValue);
        setting = false;
      }
    });
  }

  return {
    teardown() {
      node.selectize.destroy();
      if (observer) {
        observer.cancel();
      }
    }
  };
};

selectizeDecorator.types = {
  default: {},
};

export default selectizeDecorator;

const selectizeDecorator = function (node, type = 'default') {
  const keypath = Ractive.getNodeInfo(node).getBindingPath();
  const types = selectizeDecorator.types;
  const options = types.hasOwnProperty(type) ? types[type] : types.default;
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

// ractive-decorators-selectize tests
// ===============================================

describe('selectizeDecorator', function () {
  const template = `<select id="selectize-test" as-selectize value="{{foo}}">
  {{#options}}<option value="{{.}}">{{.}}</option>{{/options}}
</select>`;

  describe('types', function () {
    it('has an empty "default" type by default', function () {
      expect(selectizeDecorator.types.default, 'to be an', 'object');
      expect(selectizeDecorator.types.default, 'to be empty');
    });
  });

  describe('initialize options', function () {
    it('uses "default" type to create seletize object onto the node by default', function () {
      selectizeDecorator.types.default.hideSelected = true;

      const ractive = new Ractive({
        el: 'test-container',
        template,
        data: function () {
          return {
            foo: 'one',
            options: ['one', 'two'],
          };
        },
        decorators: {selectize: selectizeDecorator},
      });
      const selectize = $('#selectize-test').data().selectize;

      expect(selectize.settings.hideSelected, 'to be true');

      ractive.teardown();
    });

    it('uses the type specified by arg to create seletize object', function () {
      selectizeDecorator.types.max3 = {
        maxItems: 3,
        plugins: ['remove_button']
      };

      const ractive = new Ractive({
        el: 'test-container',
        template: `<select id="selectize-test" as-selectize="'max3'" value="{{foo}}" multiple>
  {{#options}}<option value="{{.}}">{{.}}</option>{{/options}}
</select>`,
        data: function () {
          return {
            foo: [],
            options: ['one', 'two', 'three', 'four', 'five'],
          };
        },
        decorators: {selectize: selectizeDecorator},
      });
      const selectize = $('#selectize-test').data().selectize;

      expect(selectize.settings.maxItems, 'to be', 3);
      expect(selectize.settings.plugins, 'to equal', ['remove_button']);

      ractive.teardown();
    });

    it('uses "default" if specified type does not exist', function () {
      selectizeDecorator.types = {default: {hideSelected: true}};

      const ractive = new Ractive({
        el: 'test-container',
        template: `<select id="selectize-test" as-selectize="none" value="{{foo}}">
  {{#options}}<option value="{{.}}">{{.}}</option>{{/options}}
</select>`,
        data: function () {
          return {
            foo: 'one',
            options: ['one', 'two'],
          };
        },
        decorators: {selectize: selectizeDecorator},
      });
      const selectize = $('#selectize-test').data().selectize;

      expect(selectize.settings.hideSelected, 'to be true');

      ractive.teardown();
    });
  });

  describe('two-way binding', function () {
    let ractive, selectize;

    before(function () {
      ractive = new Ractive({
        el: 'test-container',
        template: `${template}
<input id="text-input" type="text" value="{{bar}}" twoway="false">`,
        data: function () {
          return {
            foo: 'one',
            bar: 'xyz',
            options: ['one', 'two', 'three'],
          };
        },
        decorators: {selectize: selectizeDecorator},
      });
      selectize = $('#selectize-test').data().selectize;
    });

    after(function () {
      ractive.teardown();
    });

    it('applies changes on selectize to ractive', function () {
      selectize.addItem('two');
      expect(ractive.get('foo'), 'to be', 'two');

      selectize.addItem('three');
      expect(ractive.get('foo'), 'to be', 'three');
    });

    it('applies changes on ractive to selectize', function () {
      ractive.set('foo', 'two');
      expect(selectize.items, 'to equal', ['two']);

      ractive.set('foo', 'one');
      expect(selectize.items, 'to equal', ['one']);
    });

    it('keeps other bindings from unexpected update', function () {
      ractive.find('#text-input').value = 'zzz';

      selectize.addItem('three');
      expect(selectize.items, 'to equal', ['three']);
      expect(ractive.get('bar'), 'to be', 'xyz');
    });
  })
});

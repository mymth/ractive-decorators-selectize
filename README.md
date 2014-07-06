# Ractive.js selectize decorator plugin

*Find more Ractive.js plugins at [ractivejs.org/plugins](http://ractivejs.org/plugins)*

[See the demo here.](TODO)

## Usage

Include this file on your page below Ractive, e.g:

```html
<script src='lib/ractive.js'></script>
<script src='lib/ractive-decorators-selectize.js'></script>
```

Or, if you're using a module loader, require this module:

```js
// requiring the plugin will 'activate' it - no need to use the return value
require( 'ractive-decorators-selectize' );
```

Then, add `decorator` attribute to the select tag in your template.

```html
<select decorator='selectize' value='{{selected}}'>
    {{#options}}
        <option value='{{.}}'>{{.}}</option>
    {{/options}}
</select>
```

### Customization

#### Changing the default options

Set your options object to `Ractive.decorators.selectize.types.default`.

```js
Ractive.decorators.selectize.types.default = {
	hideSelected: true
};
```

#### Adding another option set

Add an options object into `Ractive.decorators.selectize.types` as a new property.

```js
Ractive.decorators.selectize.types.max3 = {
	maxItems: 3,
	plugins: ['remove_button']
};
```

Then use the property name as the modifier of `decorator` attribute.

```html
<select decorator='selectize:max3' value='{{selected}}' multiple>
    {{#options}}
        <option value='{{.}}'>{{.}}</option>
    {{/options}}
</select>
```

#### Using a function

Function that returns an options object can also be used. The DOM node which Selectize is applied to is passed as the argument.

```js
Ractive.decorators.selectize.types.max3 = function (node) {
	return {
		maxItems: 3,
		plugins: ['remove_button']
	};
};
```

## License

Copyright (c) 2014 Hidenao Miyamoto. Licensed MIT

Created with the [Ractive.js plugin template](https://github.com/ractivejs/plugin-template) for Grunt.
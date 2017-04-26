# Ractive.js selectize decorator plugin

*Find more Ractive.js plugins at [docs.ractivejs.org/latest/plugins](http://docs.ractivejs.org/latest/plugins)*

[See the demo here.](index.html)

## Usage

Load the decorator.

```html
<!-- on Browser (exposed to global with 'selectizeDecorator' signature) -->
<script src="lib/ractive.js"></script>
<script src="lib/ractive-decorators-selectize.js"></script>
```
```js
// on Node.js
var Ractive = require( 'ractive' );
var selectizeDecorator = require( 'ractive-decorators-selectize' );
```

Make the decorator available.

```js
// to all Ractive instances
Ractive.decorators.selectize = selectizeDecorator;

// to a single instance
var ractive = new Ractive({
    el: '#container',
    template: template,
    decorators: {
        selectize: selectizeDecorator,
    },
});

// to all instaces of RactiveSelectize
var RactiveSelectize = Ractive.extend({
    decorators: {
        selectize: selectizeDecorator,
    },
})
```

Set the `as-selectize` attribute to the select tag you want to use it.

```html
<select as-selectize value="{{selected}}">
    {{#options}}
        <option value="{{.}}">{{.}}</option>
    {{/options}}
</select>
```

### Using types

#### Customizing the default type

You can set your initialize options for Selectize to `selectizeDecorator.types.default`.

```js
selectizeDecorator.types.default = {
    hideSelected: true
};
```

#### Adding types

You can also use multiple types of Selectize elements.
To use additional types, first, add new types to `selectizeDecorator.types` with their initialize options.

```js
selectizeDecorator.types.max3 = {
    maxItems: 3,
    plugins: ['remove_button']
};
selectizeDecorator.types.answer = {
    paceholder: 'Choose your answer',
};
```

Then set the type name to the `as-selectize` attribute.
> Note: type name *must be quoted* so that the decorator can take it as a literal.

```html
<select as-selectize="'max3'" value="{{selected}}" multiple>
    {{#options}}
        <option value="{{.}}">{{.}}</option>
    {{/options}}
</select>
```

## License

Copyright (c) 2014 Hidenao Miyamoto. Licensed MIT

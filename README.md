# Ractive.js selectize decorator plugin

*Find more Ractive.js plugins at [ractive.js.org/resources/#plugins](https://ractive.js.org/resources/#plugins)*

This plugin is a decorator for [Selectize.js](https://selectize.dev).

[See the demo here.](https://raw.githack.com/mymth/ractive-decorators-selectize/v0.4.0/index.html)

## Usage

Load the plugin. 
> Selectize and jQuery are expected to be loaded before the plugin.

```html
<!-- on Browser: -->
<!-- • the plugin is exposed to global as 'selectizeDecorator' -->
<script src="https://cdn.jsdelivr.net/npm/ractive"></script>
<script src="https://cdn.jsdelivr.net/gh/mymth/ractive-decorators-selectize@0.4.0/dist/ractive-decorators-selectize.js"></script>
```
```js
// on Node.js:
import Ractive from 'ractive';
import selectizeDecorator from 'ractive-decorators-selectize';
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

Set the `as-selectize` attribute to the `select` tag you want to use the decorator.

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

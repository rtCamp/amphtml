# Example 4: Currency Converter

[Example 3](./example-3-counter.md) showcased how to use function dynamically using `useCallback`. In this example, you will learn attribute mapping and styling of the component.

> Objectives:
>
> -   Attribute-Property Mapping
> -   Styling
>     -   JSS

Goal of this example is to create a component to load latest currency conversion rate from an online service and provide live conversion functionalities as:

![Currency Converter Demo](img/Example-4-CurrencyConverter.gif)

## Attribute Mapping

Attribute mapping is the process of linking HTML Element attributes to javascript properties.

### Attribute Combination

<!-- src/preact/parse-props.js -->

The following combinations are allowed:

1.  `attr`, (optionally) `type`, and (optionally) `media` can be specified when an attribute maps to a component prop 1:1.
2.  `attrs` and `parseAttrs` can be specified when multiple attributes map to a single prop.
3.  `attrMatches` and `parseAttrs` can be specified when multiple attributes map to a single prop.
<!-- 4.  `selector` can be specified for children of a certain shape and structure according to ChildDef. -->
4.  `passthrough` can be specified to slot children using a single `<slot>` element for all children. This is in contrast to selector mode, which creates a new named `<slot>` for every selector.
5.  `passthroughNonEmpty` is similar to passthrough mode except that when there are no children elements, the returned value will be null instead of the unnamed `<slot>`. This allows the Preact environment to have conditional behavior depending on whether or not there are children.
<!--
-attr: DOM Attribute Name
-attrs: [array of att] with -parseAttrs: witg parsing fn
-attrPrefix: like 'data-param-'
-type:numeric|string|boolean
-media:true?false
-default: -->

> Note: AMP Layout attributes like ‘layout’, ‘height’, ‘heights’, ‘width’, ‘media’, etc are not needed to be mapped as they will be intrinsically passed to the Preact component.

In context of this example, we can provide developer to specify two attributes to select as a default currency symbol to convert respectivly `from` and `to`.

In context of example:

```html
<bento-currency-converter
    data-from-currency-symbol="USD"
    data-to-currency-symbol="BTC"
/>
```

This mapping process is done in `base-element.js` file as:

```jsx
/** @override */
BaseElement['props'] = {
  'fromCurrencySymbol': {attr: 'data-from-currency-symbol'},
  'toCurrencySymbol': {attr: 'data-to-currency-symbol'},
};
```

Once mapping is done, it is required to define type-checking in `component.type.js` as:

```jsx
/**
 * @typedef {{
 *   fromCurrencySymbol: (string|undefined),
 *   toCurrencySymbol: (string|undefined)
 * }}
 */
BentoCurrencyConverterDef.Props;
```

> Please refer [Type-Checking](https://github.com/ampproject/amphtml/blob/main/docs/building-a-bento-amp-extension.md#type-checking) for more details.

After defining type-attributes, we can use mapped variable in Bento/Preact Fucntional Component as:

```jsx
...
/**
 * @param {!BentoCurrencyConverter.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoCurrencyConverter({
  fromCurrencySymbol = 'USD',
  toCurrencySymbol = 'EUR',
  ...rest
}) {
    ...
```

Complete sourcecode of `component.js` should look like:

```jsx
< WIP >
```

## Summary

<!-- In this example, you walked through how to utilise dynamic function calling using `useCallback`. In [next tutorial](example-4-currency-converter.md), you will learn about attribute mapping and stylign of the Bento Component. -->

< WIP >

### Sample Bento Extension

[rtCamp/amphtml/tree/bento/sample/extensions/amp-currency-converter](https://github.com/rtCamp/amphtml/tree/bento/sample/extensions/amp-currency-converter)

<hr/>
<a href="example-5-carousel.md">Next: Example 5 - Carousel</a>

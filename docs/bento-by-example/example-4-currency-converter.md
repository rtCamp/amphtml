# Example 4: Currency Converter

[Example 3](./example-3-counter.md) showcased how to use function dynamically using `useCallback`. In this example, you will learn attribute mapping and styling of the component.

Goal of this example is to create a component to load latest currency conversion rate from an online service and provide live conversion functionalities as:

![Currency Converter Demo](img/Example-4-CurrencyConverter.gif)

## Attribute Mapping

Attribute mapping is the process of linking HTML Element attributes to javascript properties.

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

Once mapping is done, it is required to define type-attributes in `component.type.js` as:

```jsx
/**
 * @typedef {{
 *   fromCurrencySymbol: (string|undefined),
 *   toCurrencySymbol: (string|undefined)
 * }}
 */
BentoCurrencyConverterDef.Props;
```

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

< WIP >

Complete sourcecode of `component.js` should look like:

```jsx
< WIP >
```

## Summary

<!-- In this example, you walked through how to utilise dynamic function calling using `useCallback`. In [next tutorial](example-4-currency-converter.md), you will learn about attribute mapping and stylign of the Bento Component. -->

< WIP >

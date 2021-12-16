import {PreactBaseElement} from '#preact/base-element';

import {BentoCurrencyConverter} from './component';
import {CSS as COMPONENT_CSS} from './component.jss';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoCurrencyConverter;

/** @override */
BaseElement['props'] = {
  'fromCurrencySymbol': {attr: 'from-currency-symbol'},
  'toCurrencySymbol': {attr: 'to-currency-symbol'},
};

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['usesShadowDom'] = true;

// DO NOT SUBMIT: If BaseElement['shadowCss']  is set to `null`, remove the
// following declaration.
// Otherwise, keep it when defined to an actual value like `COMPONENT_CSS`.
// Once addressed, remove this set of comments.
/** @override */
BaseElement['shadowCss'] = COMPONENT_CSS;

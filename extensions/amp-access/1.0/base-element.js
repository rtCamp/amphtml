import {PreactBaseElement} from '#preact/base-element';

import {BentoAccess} from './component';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoAccess;

/** @override */
BaseElement['props'] = {
  'children': {passthrough: true},
};

/** @override */
BaseElement['layoutSizeDefined'] = false;

/** @override */
BaseElement['usesShadowDom'] = false;

/** @override */
BaseElement['shadowCss'] = null;

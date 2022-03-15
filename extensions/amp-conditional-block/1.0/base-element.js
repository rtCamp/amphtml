import {PreactBaseElement} from '#preact/base-element';

import {BentoConditionalBlock} from './component';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoConditionalBlock;

/** @override */
BaseElement['props'] = {
  'children': {passthrough: true},
};

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['usesShadowDom'] = true;

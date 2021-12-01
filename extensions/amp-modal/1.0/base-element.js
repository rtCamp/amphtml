import {PreactBaseElement} from '#preact/base-element';

import {BentoModal} from './component';
import {CSS as COMPONENT_CSS} from './component.jss';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoModal;

/** @override */
BaseElement['props'] = {
  'children': {passthroughNonEmpty: true},
  showAfter: {attr: 'show-after', type: 'number'},
  title: {attr: 'title', type: 'string'},
};

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['usesShadowDom'] = true;

/** @override */
BaseElement['shadowCss'] = COMPONENT_CSS;

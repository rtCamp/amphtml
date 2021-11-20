import {PreactBaseElement} from '#preact/base-element';

import {BentoDismiss} from './component';
_;

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoDismiss;

/** @override */
BaseElement['props'] = {
  // 'children': {passthrough: true},
  'children': {passthroughNonEmpty: true},
  'expires': {attr: 'data-expires'},
  'once': {attr: 'data-once'},
  'onceAday': {attr: 'data-once-a-day'},
  'untilDismissed': {attr: 'data-until-dismissed'},
  dismissButton: {
    selector: 'dismissButton',
    single: false,
    clone: true,
  },
  // 'children': {selector: '...'},
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
BaseElement['shadowCss'] = null;

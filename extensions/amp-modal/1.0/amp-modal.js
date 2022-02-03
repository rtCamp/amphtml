import {userAssert} from '#core/assert';

import {isExperimentOn} from '#experiments';

import {BaseElement} from './base-element';

import {CSS} from '../../../build/amp-modal-1.0.css';

/** @const {string} */
const TAG = 'amp-modal';

class AmpNcbModel extends BaseElement {
  /** @override */
  init() {
    this.registerApiAction('showModel', (api, invocation) => {
      const {args} = invocation;
      api.showModel(args['title'], args['contents']);
    });
    this.registerApiAction('hideModel', (api) => api.hideModel());
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-model'),
      'expected global "bento" or specific "bento-model" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpNcbModel, CSS);
});

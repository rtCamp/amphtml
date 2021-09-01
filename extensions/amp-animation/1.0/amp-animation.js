import {dict} from '#core/types/object';

import {isExperimentOn} from '#experiments';

import {BaseElement} from './base-element';

import {userAssert} from '../../../src/log';

/** @const {string} */
const TAG = 'amp-animation';

class AmpAnimation extends BaseElement {
  /** @override */
  init() {
    // DO NOT SUBMIT: This is example code only.
    this.registerApiAction('exampleToggle', (api) =>
      api./*OK*/ exampleToggle()
    );

    return dict({
      // Extra props passed by wrapper AMP component
      'exampleTagNameProp': this.element.tagName,
    });
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-animation'),
      'expected global "bento" or specific "bento-animation" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpAnimation);
});

import {CommonSignals} from '#core/constants/common-signals';
import {realChildElements} from '#core/dom/query';
import {isFiniteNumber} from '#core/types';

import {isExperimentOn} from '#experiments';

import {Services} from '#service';

import {BaseElement} from './base-element';

import {CSS} from '../../../build/amp-image-slider-1.0.css';
import {dev, user, userAssert} from '../../../src/log';

/** @const {string} */
const TAG = 'amp-image-slider';
const VALID_IMAGE_TAGNAMES = new Set(['AMP-IMG', 'IMG']);

class AmpImageSlider extends BaseElement {
  /** @override */
  init() {
    this.registerApiAction('seekTo', (api, invocation) => {
      const {args} = invocation;
      const percent = parseFloat(args['percent']);
      if (isFiniteNumber(percent)) {
        api.seekTo(percent);
      }
    });
  }

  /** @override */
  // buildCallback() {
  //   const children = realChildElements(this.element);
  //   for (const child of children) {
  //     if (VALID_IMAGE_TAGNAMES.has(child.tagName)) {
  //       // First encountered = left image
  //       // Second encountered = right image
  //       if (!this.leftImage_) {
  //         this.leftImage_ = child;
  //       } else if (!this.rightImage_) {
  //         this.rightImage_ = child;
  //       } else {
  //         user().error(
  //           'AMP-IMAGE-SLIDER',
  //           'Should not contain more than 2 images.'
  //         );
  //       }
  //     }
  //   }
  //   userAssert(
  //     this.leftImage_ && this.rightImage_,
  //     '2 images must be provided for comparison'
  //   );
  //   // see comment in layoutCallback
  //   // When layers not enabled
  //   const owners = Services.ownersForDoc(this.element);
  //   if (this.leftImage_.tagName === 'AMP-IMG') {
  //     owners.setOwner(dev().assertElement(this.leftImage_), this.element);
  //     this.containsAmpImages_ = true;
  //   }
  //   if (this.rightImage_.tagName === 'AMP-IMG') {
  //     owners.setOwner(dev().assertElement(this.rightImage_), this.element);
  //     this.containsAmpImages_ = true;
  //   }
  //   if (this.containsAmpImages_) {
  //     // Extensions such as amp-carousel still uses .setOwner()
  //     // This would break the rendering of the images as carousel
  //     // will call .scheduleLayout on the slider but not the contents
  //     // while Resources would found amp-imgs' parent has owner and
  //     // refuse to run the normal scheduling in discoverWork_.
  //     // SIMPLER SOL: simply always call scheduleLayout no matter what
  //     const owners = Services.ownersForDoc(this.element);
  //     owners.scheduleLayout(this.element, dev().assertElement(this.leftImage_));
  //     owners.scheduleLayout(
  //       this.element,
  //       dev().assertElement(this.rightImage_)
  //     );
  //     return Promise.all([
  //       dev()
  //         .assertElement(this.leftImage_)
  //         .signals()
  //         .whenSignal(CommonSignals.LOAD_END),
  //       dev()
  //         .assertElement(this.rightImage_)
  //         .signals()
  //         .whenSignal(CommonSignals.LOAD_END),
  //     ]);
  //   }
  // }

  // /** @override */
  // layoutCallback() {
  //   if (this.containsAmpImages_) {
  //     // Extensions such as amp-carousel still uses .setOwner()
  //     // This would break the rendering of the images as carousel
  //     // will call .scheduleLayout on the slider but not the contents
  //     // while Resources would found amp-imgs' parent has owner and
  //     // refuse to run the normal scheduling in discoverWork_.
  //     // SIMPLER SOL: simply always call scheduleLayout no matter what
  //     const owners = Services.ownersForDoc(this.element);
  //     owners.scheduleLayout(this.element, dev().assertElement(this.leftImage_));
  //     owners.scheduleLayout(
  //       this.element,
  //       dev().assertElement(this.rightImage_)
  //     );
  //     return Promise.all([
  //       dev()
  //         .assertElement(this.leftImage_)
  //         .signals()
  //         .whenSignal(CommonSignals.LOAD_END),
  //       dev()
  //         .assertElement(this.rightImage_)
  //         .signals()
  //         .whenSignal(CommonSignals.LOAD_END),
  //     ]);
  //   }
  // }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-image-slider'),
      'expected global "bento" or specific "bento-image-slider" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpImageSlider, CSS);
});

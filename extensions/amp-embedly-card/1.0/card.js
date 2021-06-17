/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Preact from '../../../src/preact';
import {ContainWrapper} from '../../../src/preact/component';
import {TAG as KEY_TAG} from './amp-embedly-key';
import {getIframe} from '../../../src/3p-frame';
import {listenFor} from '../../../src/iframe-helper';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from '../../../src/preact';

/**
 * Attribute name used to set api key with name
 * expected by embedly.
 * @const {string}
 */
const API_KEY_ATTR_NAME = 'data-card-key';

/**
 * @param {!EmbedlyCardDef.Props} props
 * @return {PreactDef.Renderable}
 */
export function EmbedlyCard({getEmbedlyCard, requestResize, url, ...rest}) {
  // Property and Reference Variables
  const iframeRef = useRef(null);

  // Checking for valid props
  if (!checkProps(url)) {
    //return null;
  }

  // // Prepare Soundcloud Widget URL for iFrame
  // let iframeSrc =
  //   'https://w.soundcloud.com/player/?' +
  //   'url=' +
  //   encodeURIComponent(url + mediaId);

  // if (secretToken) {
  //   // It's very important the entire thing is encoded, since it's part of
  //   // the `url` query param added above.
  //   iframeSrc += encodeURIComponent('?secret_token=' + secretToken);
  // }

  // if (visual) {
  //   iframeSrc += '&visual=true';
  // } else if (color) {
  //   iframeSrc += '&color=' + encodeURIComponent(color);
  // }
  const iframe = getEmbedlyCard();

  useEffect(() => {
    const opt_is3P = true;
    listenFor(
      iframe,
      'embed-size',
      (data) => {
        requestResize(data['height']);
      },
      opt_is3P
    );

    /** Unmount Procedure */
    return () => {
      // Release iframe resources
      iframeRef.current = null;
    };
  }, []);
  console.log(iframe);
  return {iframe};
}

/**
 * Verify required props and throw error if necessary.
 * @param url Hello
 * @return {boolean} true on valid
 */
function checkProps(url) {
  // Perform manual checking as assertion is not available for Bento: Issue #32739
  if (url === undefined) {
    displayWarning('data-url is required for <amp-embedly-card>');
    return false;
  }
  return true;
}

/**
 * @param {?string} message
 */
function displayWarning(message) {
  console /*OK*/
    .warn(message);
}

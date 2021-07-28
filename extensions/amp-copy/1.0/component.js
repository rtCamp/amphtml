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
import * as Preact from '#preact';
import {useCallback, useLayoutEffect, useRef, useState} from '#preact';
import objstr from 'obj-str';
import {
  copyTextToClipboard,
  isCopyingToClipboardSupported,
} from '../../../src/clipboard';
import {useStyles} from './component.jss';
/**
 * @param {!CopyDef.Props} props
 * @return {PreactDef.Renderable}
 */
export function Copy({children, sourceId, text, ...rest}) {
  const ref = useRef(null);
  const [status, setStatus] = useState(null);
  const [isCopySupported, setIsCopySupported] = useState(false);
  const classes = useStyles();
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isCopyingToClipboardSupported(ref.current.ownerDocument)) {
      setIsCopySupported(true);
    } else {
      setIsCopySupported(false);
    }
  }, [setIsCopySupported]);
  const copy = useCallback((sourceId) => {
    const content = ref.current.ownerDocument.getElementById(sourceId);
    const text = (content.value ?? content.textContent).trim();
    setStatus(copyTextToClipboard(window, text));
  }, []);
  return (
    <button
      ref={ref}
      className={objstr({
        [classes.success]: status,
        [classes.failed]: !status,
        [classes.enabled]: isCopySupported,
        [classes.disabled]: !isCopySupported,
      })}
      layout
      size
      paint
      {...rest}
      onClick={() => copy(sourceId)}
    >
      {children}
    </button>
  );
}

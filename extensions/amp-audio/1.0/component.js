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
import {ContainWrapper} from '#preact/component';
import {forwardRef} from '#preact/compat';
import {listen} from '../../../src/event-helper';
import {setMediaSession} from '../../../src/mediasession-helper';
import {triggerAnalyticsEvent} from '../../../src/analytics';

const {useCallback, useEffect, useImperativeHandle, useMemo, useRef} = Preact;

/**
 * @param {!AudioDef.Props} props
 * @param {{current: (!AudioDef.AudioApi|null)}} ref
 * @return {PreactDef.Renderable}
 */
export function AudioWithRef(
  {
    album,
    ariaDescribedby,
    ariaLabel,
    ariaLabelledby,
    artist,
    artwork,
    autoplay,
    controlsList,
    loop,
    muted,
    preload,
    propagateAttributes,
    sources,
    src,
    title,
    validateMediaMetadata,
    ...rest
  },
  ref
) {
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);

  /** @public {boolean} */
  const isPlaying = useRef(false);

  /**
   * Prepares Media Metadata
   */
  const metaData = useMemo(() => {
    return {
      title,
      artist,
      album,
      artwork: [{src: artwork}],
    };
  }, [title, artist, album, artwork]);

  /**
   * Plays audio callback
   */
  const playCallback = useCallback(() => {
    triggerAnalyticsEvent(audioRef.current, 'audio-play');
    audioRef.current.play();
    isPlaying.current = true;
  }, [isPlaying]);

  /**
   * Pauses audio callback
   */
  const pauseCallback = useCallback(() => {
    triggerAnalyticsEvent(audioRef.current, 'audio-pause');
    audioRef.current.pause();
    isPlaying.current = false;
  }, [isPlaying]);

  /**
   * Updates media session for current window/tab
   */
  const audioPlaying = useCallback(() => {
    const win = audioRef.current?.ownerDocument?.defaultView;
    const element = audioRef.current;

    if (validateMediaMetadata) {
      validateMediaMetadata(element, metaData);
    }

    setMediaSession(win, metaData, playCallback, pauseCallback);
  }, [metaData, validateMediaMetadata, playCallback, pauseCallback]);

  useEffect(() => {
    if (!audioRef.current.play) {
      return;
    }

    const unlistenPlaying = listen(audioRef.current, 'playing', () =>
      audioPlaying()
    );

    if (propagateAttributes) {
      propagateAttributes(
        [
          'aria-describedby',
          'aria-label',
          'aria-labelledby',
          'autoplay',
          'controlsList',
          'loop',
          'muted',
          'preload',
          'src',
        ],
        audioRef.current
      );
    }

    // Execute at unlayout
    return () => {
      unlistenPlaying();
    };
  }, [audioPlaying, propagateAttributes]);

  /** Audio Component - API Functions */
  useImperativeHandle(
    ref,
    () =>
      /** @type {!AudioDef.AudioApi} */ ({
        play: () => playCallback(),
        pause: () => pauseCallback(),
        isPlaying: () => isPlaying.current,
      }),
    [playCallback, pauseCallback]
  );

  return (
    <ContainWrapper contentRef={wrapperRef} size layout paint>
      <audio
        ref={audioRef}
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        autoplay={autoplay}
        controls // Force controls otherwise there is no player UI.
        controlsList={controlsList}
        loop={loop}
        muted={muted}
        preload={preload}
        src={src}
        {...rest}
      >
        {sources}
      </audio>
    </ContainWrapper>
  );
}

const Audio = forwardRef(AudioWithRef);
Audio.displayName = 'Audio'; // Make findable for tests.
export {Audio};

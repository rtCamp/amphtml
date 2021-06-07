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

import * as Preact from '../../../../src/preact';
import {Soundcloud} from '../component';
import {boolean, color, text, withKnobs} from '@storybook/addon-knobs';

export default {
  title: 'Soundcloud',
  component: Soundcloud,
  decorators: [withKnobs],
};

export const track = () => {
  const trackid = text('Track ID', '864765493');
  const height = text('Height', '180');
  const mcolor = color('Color', 'ff5500');
  const visual = boolean('Visual', true);

  const rgb = mcolor
    .replace(/\s/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : mcolor;

  // multiply before convert to HEX
  hex = hex;

  return (
    <Soundcloud
      height={height}
      trackId={trackid}
      color={hex}
      visual={visual}
      layout="fixed-height"
    />
  );
};

export const playlist = () => {
  const playlistid = text('Playlist ID', '151584683');
  const height = text('height', '480');
  const mcolor = color('color', 'RGBA(255, 85, 0, 1)');
  const visual = boolean('Visual', true);

  const rgb = mcolor
    .replace(/\s/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : mcolor;

  // multiply before convert to HEX
  hex = hex;

  return (
    <Soundcloud
      height={height}
      playlistId={playlistid}
      color={hex}
      visual={visual}
      layout="fixed-height"
    />
  );
};

import {withKnobs} from '@storybook/addon-knobs';

import * as Preact from '#preact';

import {Animation} from '../component';

export default {
  title: 'Animation',
  component: Animation,
  decorators: [withKnobs],
};

export const _default = () => {
  // DO NOT SUBMIT: This is example code only.
  return (
    <Animation
      style={{width: 300, height: 200}}
      example-property="example string property value"
    >
      This text is inside.
    </Animation>
  );
};

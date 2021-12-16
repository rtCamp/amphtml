import * as Preact from '#preact';
import {withAmp} from '@ampproject/storybook-addon';

export default {
  title: 'amp-counter-1_0',
  decorators: [withAmp],
  parameters: {
    extensions: [{name: 'amp-counter', version: '1.0'}],
    experiments: ['bento'],
  },
  args: {
    'data-example-property': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <amp-counter width="300" height="200" {...args}>
      This text is inside.
    </amp-counter>
  );
};

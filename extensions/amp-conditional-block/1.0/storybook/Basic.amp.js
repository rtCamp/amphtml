import * as Preact from '#preact';
import {withAmp} from '@ampproject/storybook-addon';

export default {
  title: 'amp-conditional-block-1_0',
  decorators: [withAmp],
  parameters: {
    extensions: [{name: 'amp-conditional-block', version: '1.0'}],
    experiments: ['bento'],
  },
  args: {
    'data-example-property': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <amp-conditional-block width="300" height="200" {...args}>
      This text is inside.
    </amp-conditional-block>
  );
};

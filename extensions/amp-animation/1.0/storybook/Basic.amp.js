import {withAmp} from '@ampproject/storybook-addon';
import {withKnobs} from '@storybook/addon-knobs';

import * as Preact from '#preact';

export default {
  title: 'amp-animation-1_0',
  decorators: [withKnobs, withAmp],

  parameters: {
    extensions: [{name: 'amp-animation', version: '1.0'}],
    experiments: ['bento'],
  },
};

// DO NOT SUBMIT: This is example code only.
export const ExampleUseCase = () => {
  return (
    <amp-animation
      width="300"
      height="200"
      example-property="example string property value"
    >
      This text is inside.
    </amp-animation>
  );
};

ExampleUseCase.story = {
  name: 'Example use case story',
};

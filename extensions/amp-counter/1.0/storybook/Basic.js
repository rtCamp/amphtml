import * as Preact from '#preact';
import {BentoCounter} from '../component';

export default {
  title: 'Counter',
  component: BentoCounter,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoCounter style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoCounter>
  );
};

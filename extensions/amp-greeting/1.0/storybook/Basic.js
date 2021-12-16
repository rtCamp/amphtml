import * as Preact from '#preact';
import {BentoGreeting} from '../component';

export default {
  title: 'Greeting',
  component: BentoGreeting,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoGreeting style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoGreeting>
  );
};

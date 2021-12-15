import * as Preact from '#preact';
import {BentoHelloWorld} from '../component';

export default {
  title: 'HelloWorld',
  component: BentoHelloWorld,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoHelloWorld style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoHelloWorld>
  );
};

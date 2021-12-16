import * as Preact from '#preact';
import {BentoCurrencyConverter} from '../component';

export default {
  title: 'CurrencyConverter',
  component: BentoCurrencyConverter,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoCurrencyConverter style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoCurrencyConverter>
  );
};

import * as Preact from '#preact';
import {BentoWvpCarousel} from '../component';

export default {
  title: 'WvpCarousel',
  component: BentoWvpCarousel,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoWvpCarousel style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoWvpCarousel>
  );
};

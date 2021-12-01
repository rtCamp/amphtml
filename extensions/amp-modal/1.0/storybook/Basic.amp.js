import {withAmp} from '@ampproject/storybook-addon';

import * as Preact from '#preact';

export default {
  title: 'amp-modal-1_0',
  decorators: [withAmp],
  parameters: {
    extensions: [{name: 'amp-modal', version: '1.0'}],
    experiments: ['bento'],
  },
  args: {
    'data-example-property': 'example string property argument',
  },
};

export const _default = (args) => {
  return (
    <div height="800" with="400">
      <p>
        Web Vitals patterns A collection of common UX patterns optimized for
        Core Web Vitals. This collection includes patterns that are often tricky
        to implement without hurting your Core Web Vitals scores. You can use
        the code in these examples to help ensure your projects stay on the
        right track.
      </p>
      <p>Model is set to auto display after 2500ms.</p>

      <button on="tap:myModel1.showModel(title='hello', contents=<p>xyz</p>)">
        Show Model
      </button>

      <amp-modal
        id="myModel1"
        title="Model Title 2"
        showAfter="2500"
        layout="responsive"
        height="200"
        width="400"
        {...args}
      >
        <p>This is a non-certified Bento Model.</p>
        <a href="#x">Learn more</a>
      </amp-modal>
    </div>
  );
};

import * as Preact from '#preact';
import {useRef} from '#preact';

import {BentoModal} from '../component';

export default {
  title: 'Modal',
  component: BentoModal,
};

export const _default = (args) => {
  const modelRef = useRef(null);
  return (
    <>
      <p>
        Web Vitals patterns A collection of common UX patterns optimized for
        Core Web Vitals. This collection includes patterns that are often tricky
        to implement without hurting your Core Web Vitals scores. You can use
        the code in these examples to help ensure your projects stay on the
        right track.
      </p>
      <p>Model is set to auto display after 2500ms.</p>
      <button
        onClick={() => {
          modelRef.current.showModel('Hello World', <p>New text</p>);
        }}
      >
        Show Model
      </button>

      <BentoModal
        ref={modelRef}
        style={{width: 'auto', height: 'auto'}}
        showAfter="2500"
        title="Model Title 2"
        {...args}
      >
        <p>This is a non-certified Bento Model.</p>
        <a href="#x">Learn more</a>
      </BentoModal>
    </>
  );
};

import * as Preact from '#preact';

import {BentoDismiss} from '../component';

export default {
  title: 'Dismiss',
  component: BentoDismiss,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

export const Once_A_Day = (args) => {
  const ref = Preact.useRef();
  return (
    <BentoDismiss
      ref={ref}
      style={{width: 300, height: 200}}
      onceAday
      {...args}
    >
      -- Newspack PopUp Code Goes Here -- attr="once-a-day"
    </BentoDismiss>
  );
};

export const Once = (args) => {
  const ref = Preact.useRef();
  return (
    <BentoDismiss ref={ref} style={{width: 300, height: 200}} once {...args}>
      -- Newspack PopUp Code Goes Here -- attr="once"
    </BentoDismiss>
  );
};

export const UntilDismissed = (args) => {
  const ref = Preact.useRef();
  return (
    <BentoDismiss
      ref={ref}
      style={{width: 300, height: 200}}
      untilDismissed
      dismissButton={(props) => {
        <button {...props}>Dismiss with Attribute</button>;
      }}
      {...args}
    >
      -- Newspack PopUp Code Goes Here --
      <button
        onClick={() => {
          ref.current.dismiss();
        }}
      >
        Dismiss with Ref
      </button>
    </BentoDismiss>
  );
};

export const UntilDismissedWithExpiration = (args) => {
  const ref = Preact.useRef();
  return (
    <BentoDismiss
      ref={ref}
      style={{width: 300, height: 200}}
      untilDismissed
      expires="10000"
      dismissButton={(props) => {
        <button {...props}>Dismiss with Attribute</button>;
      }}
      {...args}
    >
      -- Newspack PopUp Code Goes Here --
      <button
        onClick={() => {
          ref.current.dismiss();
        }}
      >
        Dismiss with Ref
      </button>
    </BentoDismiss>
  );
};

/**
<bento-dismiss
  width=300
  height=200

  id="myDismissComp"

  once

  once-a-day

  until-dismiss

  expires="UNIX-TIMESTAMP"
>
  <-- Newspack Popup Code Here -->

  <button on="tap:myDismissComp.dismiss()">
    Dismiss with Ref
  </button>

  <button dismiss-button>
    Dismiss with Attribute
  </button>;

</bento-dismiss>
 */

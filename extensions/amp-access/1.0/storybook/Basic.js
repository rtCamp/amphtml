import * as Preact from '#preact';
import {createRef} from '#preact';

import {BentoAccess} from '../component';
export default {
  title: 'Access',
  component: BentoAccess,
};

export const hasDonated = (args) => {
  const ref = createRef();
  const script = document.createElement('script');
  script.appendChild(
    document.createTextNode(
      '{"top_level":{"default_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}}},"hasDonated":{"default_operation":{"type":"variable","operation":"hasDonated = false"},"condition":"hasDonated","true_operation":null,"false_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}},"expiration":"every-7-days"}}'
    )
  );
  script.type = 'application/script';

  return (
    <>
      <BentoAccess style={{width: 300, height: 100}} {...args} ref={ref}>
        {script}
      </BentoAccess>

      <section
        bento-access="hasDonated"
        hidden
        style={{
          background: 'green',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'green',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Donated
      </section>
      <section
        bento-access="NOT hasDonated"
        hidden
        style={{
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'green',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        NOT Donated
      </section>
    </>
  );
};

export const isSubscriber = (args) => {
  const ref = createRef();
  const script = document.createElement('script');
  script.appendChild(
    document.createTextNode(
      '{"top_level":{"default_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}}},"isSubscriber":{"default_operation":{"type":"variable","operation":"isSubscriber = false"},"condition":"isSubscriber","true_operation":null,"false_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}},"expiration":"every-30-days"}}'
    )
  );
  script.type = 'application/script';

  return (
    <>
      <BentoAccess style={{width: 300, height: 100}} {...args} ref={ref}>
        {script}
      </BentoAccess>

      <section
        bento-access="isSubscriber"
        hidden
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'blue',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Subscriber
      </section>
      <section
        bento-access="NOT isSubscriber"
        hidden
        style={{
          background: 'lightblue',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'blue',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        NOT Subscriber
      </section>
    </>
  );
};

// DO NOT SUBMIT: This is example code only.
export const visitCount = (args) => {
  const ref = createRef();
  const script = document.createElement('script');
  script.appendChild(
    document.createTextNode(
      '{"top_level":{"default_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}}},"visitCount":{"default_operation":{"type":"variable","operation":"visitCount = 5"},"condition":"visitCount < 10","true_operation":{"type":"variable","operation":"visitCount = visitCount + 1"},"false_operation":null,"expiration":"every-30-days"}}'
    )
  );
  script.type = 'application/script';

  return (
    <>
      <BentoAccess style={{width: 300, height: 100}} {...args} ref={ref}>
        {script}
      </BentoAccess>

      <section
        bento-access="visitCount < 10"
        hidden
        style={{padding: '10px', margin: '10px', borderRadius: '5px'}}
      >
        visitCount &lt; 10
      </section>

      <section
        style={{
          background: 'yellow',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'orange',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Visible to all
      </section>
    </>
  );
};

// DO NOT SUBMIT: This is example code only.
export const _defaults = (args) => {
  const ref = createRef();
  const script = document.createElement('script');
  script.appendChild(
    document.createTextNode(
      '{"top_level":{"default_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}}},"hasDonated":{"default_operation":{"type":"variable","operation":"hasDonated = false"},"condition":"hasDonated","true_operation":null,"false_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}},"expiration":"every-7-days"},"isSubscriber":{"default_operation":{"type":"variable","operation":"isSubscriber = false"},"condition":"isSubscriber","true_operation":null,"false_operation":{"type":"GET","url":"http://localhost:3000/subscribers/1","options":{"method":"GET"}},"expiration":"every-30-days"},"visitCount":{"default_operation":{"type":"variable","operation":"visitCount = 0"},"condition":"visitCount < 10","true_operation":{"type":"variable","operation":"visitCount = visitCount + 1"},"false_operation":null,"expiration":"every-30-days"}}'
    )
  );
  script.type = 'application/script';

  return (
    <>
      <BentoAccess style={{width: 300, height: 100}} {...args} ref={ref}>
        {script}
      </BentoAccess>

      <section
        bento-access="hasDonated"
        hidden
        style={{
          background: 'green',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'green',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Donated
      </section>
      <section
        bento-access="NOT hasDonated"
        hidden
        style={{
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'green',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        NOT Donated
      </section>

      <section
        bento-access="isSubscriber"
        hidden
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'blue',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Subscriber
      </section>
      <section
        bento-access="NOT isSubscriber"
        hidden
        style={{
          background: 'lightblue',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'blue',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        NOT Subscriber
      </section>

      <section
        bento-access="hasDonated AND isSubscriber"
        hidden
        style={{padding: '10px', margin: '10px', borderRadius: '5px'}}
      >
        Subscriber AND hasDonated
      </section>
      <section
        bento-access="hasDonated OR isSubscriber"
        hidden
        style={{padding: '10px', margin: '10px', borderRadius: '5px'}}
      >
        Subscriber OR hasDonated
      </section>

      <section
        bento-access="visitCount < 10"
        hidden
        style={{padding: '10px', margin: '10px', borderRadius: '5px'}}
      >
        visitCount lt 10
      </section>

      <section
        style={{
          background: 'yellow',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          borderColor: 'orange',
          borderStyle: 'solid',
          width: '250px',
        }}
      >
        Visible to all
      </section>
    </>
  );
};

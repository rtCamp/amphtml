import * as Preact from '#preact';
import {useEffect, useLayoutEffect, useState} from '#preact';
import {ContainWrapper} from '#preact/component';

/**
 * @param {!BentoGreeting.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoGreeting({...rest}) {
  const [greetMessage, setGreetMessage] = useState('Retrieving time...');

  /**
   * `      useEffect` executes in asynchronous after DOM initialization in memory.
   * `useLayoutEffect` executes in  synchronous after DOM initialization in memory.
   */
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setGreetMessage('Good Morning!');
    } else if (hour === 12) {
      setGreetMessage('Good Noon!');
    } else if (hour < 16) {
      setGreetMessage('Good Afternoon!');
    } else if (hour < 21) {
      setGreetMessage('Good Evening!');
    } else {
      setGreetMessage('Good Night!');
    }
  }, []);

  return (
    <ContainWrapper layout size paint {...rest}>
      {greetMessage}
    </ContainWrapper>
  );
}

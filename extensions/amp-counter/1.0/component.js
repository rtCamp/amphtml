import * as Preact from '#preact';
import {useCallback, useState} from '#preact';
import {ContainWrapper} from '#preact/component';

/**
 * @param {!BentoCounter.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoCounter({...rest}) {
  /** State Variables */
  const [counterValue, setCounterValue] = useState(0);

  /**
   * Increment `counterValue` by one.
   */
  const incrementCounter = useCallback(() => {
    // Update `counterValue` state with new value
    setCounterValue(counterValue + 1);
  }, [counterValue]);

  /**
   * Decrement `counterValue` by one.
   */
  const decrementCounter = useCallback(() => {
    // Update `counterValue` state with new value
    setCounterValue(counterValue - 1);
  }, [counterValue]);

  return (
    <ContainWrapper layout size paint {...rest}>
      <div>
        <span style={{'margin': 10}}>
          <button onClick={incrementCounter}>+</button>
        </span>
        <span style={{'margin': 10}}>{counterValue}</span>
        <span style={{'margin': 10}}>
          <button onClick={decrementCounter}>-</button>
        </span>
      </div>
    </ContainWrapper>
  );
}

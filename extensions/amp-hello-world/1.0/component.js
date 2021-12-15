import * as Preact from '#preact';
import {ContainWrapper} from '#preact/component';

/**
 * @param {!BentoHelloWorld.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoHelloWorld({...rest}) {
  return (
    <ContainWrapper layout size paint {...rest}>
      Hello World
    </ContainWrapper>
  );
}

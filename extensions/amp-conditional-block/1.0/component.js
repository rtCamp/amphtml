import * as Preact from '#preact';
import {useCallback, useEffect} from '#preact';
import {forwardRef} from '#preact/compat';
import {ContainWrapper} from '#preact/component';
import {logger} from '#preact/logger';

import {BlockProcessor} from './block-processor';

/**
 * @param {!BentoConditionalBlockDef.Props} props
 * @param {{current: ?BentoConditionalBlockDef.BentoConditionalBlockApi}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoConditionalBlockWithRef({children, ...rest}, ref) {
  /**
   * Retrieves all elements with [conditional-block] attribute
   */
  const queryAllSelectors = useCallback((doc) => {
    const docRef = doc || document;
    const accessElements = docRef.querySelectorAll('[conditional-block]');
    logger.info('Elements with [conditional-block]: ', accessElements);
    return accessElements;
  }, []);

  /**
   * Retrieve and parse configuration script for localStorage
   */
  const getJsonConfig = useCallback(() => {
    const docRef = document;
    const configurationScript = docRef.getElementById('conditional-block');
    const parsedData = JSON.parse(
      configurationScript.childNodes[0].textContent
    );
    logger.info('Parsed Configuration Script: ', parsedData);
    return parsedData;
  }, []);

  /**
   * Compute an expression on selector to determine whether to show or hide
   */
  const compute = useCallback((processor_, selector) => {
    const expression = selector.attributes['conditional-block'].value;

    if (processor_.evaluate(expression)) {
      selector.removeAttribute('hidden');
      logger.info('Expression: ', expression, ' | SHOW');
      logger.info('on: ', selector);
    } else {
      selector.setAttribute('hidden', '');
      logger.warn('Expression: ', expression, ' | HIDE');
      logger.warn('on: ', selector);
    }
  }, []);

  useEffect(() => {
    // Retrieve all elements
    const accessElements = queryAllSelectors();

    // Retrieve parsed configuration
    const parsedData = getJsonConfig();

    /** @private {!./access-processor.BlockProcessor} */
    new BlockProcessor(parsedData, (exprProcessor) => {
      // TODO (@AnuragVasanwala): Resolve bug with startup loading for first time,
      //                          when localStorage is empty -> it loads defaultOperation
      setTimeout(() => {
        accessElements.forEach((selector) => {
          logger.info('Processing', selector);
          compute(exprProcessor, selector);
        });
      }, 500);
    });
  }, [children, ref, getJsonConfig, compute, queryAllSelectors]);
  return <ContainWrapper layout size paint {...rest}></ContainWrapper>;
}

const BentoConditionalBlock = forwardRef(BentoConditionalBlockWithRef);
BentoConditionalBlock.displayName = 'BentoConditionalBlock'; // Make findable for tests.
export {BentoConditionalBlock};

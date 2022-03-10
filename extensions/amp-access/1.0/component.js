import * as Preact from '#preact';
import {useCallback, useEffect} from '#preact';
import {forwardRef} from '#preact/compat';
import {ContainWrapper} from '#preact/component';
import {logger} from '#preact/logger';

import {AccessProcessor} from './access-processor';

/**
 * @param {!BentoAccess.Props} props
 * @param {{current: ?AccessDef.AccessApi}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoAccessWithRef({children}, ref) {
  /**
   * Retrieves all elements with [bento-access] attribute
   */
  const queryAllSelectors = useCallback((doc) => {
    const accessElements = doc.querySelectorAll('[bento-access]');
    logger.info('Elements with [bento-access]: ', accessElements);
    return accessElements;
  }, []);

  /**
   * Retrieve and parse configuration script for localStorage
   */
  const getJsonConfig = useCallback((chileNodes) => {
    const nodes = chileNodes;
    const parsedData = JSON.parse(nodes.childNodes[0].textContent);
    logger.info('Parsed Configuration Script: ', parsedData);
    return parsedData;
  }, []);

  /**
   * Compute an expression on selector to determine whether to show or hide
   */
  const compute = useCallback((processor_, selector) => {
    const expression = selector.attributes['bento-access'].value;

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
    const accessElements = queryAllSelectors(ref.current.ownerDocument);

    // Retrieve parsed configuration
    const parsedData = getJsonConfig(children);

    /** @private {!./access-processor.AccessProcessor} */
    new AccessProcessor(parsedData, (exprProcessor) => {
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
  return <ContainWrapper ref={ref}></ContainWrapper>;
}

const BentoAccess = forwardRef(BentoAccessWithRef);
BentoAccess.displayName = 'BentoAccess'; // Make findable for tests.
export {BentoAccess};

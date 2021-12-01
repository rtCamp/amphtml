import {toggle} from '#core/dom/style';

import * as Preact from '#preact';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from '#preact';
import {forwardRef} from '#preact/compat';

import {useStyles} from './component.jss';

/**
 * @param {!BentoModal.Props} props
 * @param {{current: ?BentoModal.Api}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoModalWithRef(
  {children, showAfter = 0, title, ...rest},
  ref
) {
  /** States */
  const [headerText, setHeaderText] = useState(title);
  const [contents, setContents] = useState(children);

  /** References */
  const modelRef = useRef(null);

  /** User-defined Styles */
  const styles = useStyles();

  /**
   * Hides Model Dialog
   */
  const hideModel = useCallback(() => {
    toggle(modelRef.current, false);
  }, []);

  /**
   * Displays Model Dialog
   */
  const showModel = useCallback((title = null, contents = null) => {
    console /*OK*/
      .log(title);
    console /*OK*/
      .log(contents);
    if (title !== null) {
      setHeaderText(title);
    }
    if (contents !== null) {
      setContents(contents);
    }
    toggle(modelRef.current, true);
  }, []);

  /** Model Component - API Functions */
  useImperativeHandle(
    ref,
    () =>
      /** @type {!AudioDef.AudioApi} */ ({
        hideModel,
        showModel,
      }),
    [hideModel, showModel]
  );

  useEffect(() => {
    /** Auto display after specified time, if `showAfter` > 0ms */
    const showAfterMs = parseInt(showAfter, 10);
    if (showAfterMs > 0) {
      setTimeout(() => {
        showModel();
      }, showAfterMs);
    }
  }, [showModel, showAfter]);

  return (
    <div ref={modelRef} class={styles.model} hidden size layout {...rest}>
      <button
        class={styles.closeButton}
        onClick={hideModel}
        aria-label="close"
        tabIndex="0"
      >
        ✕
      </button>
      <div>
        <h1>{headerText}</h1>
        {contents}
      </div>
    </div>
  );
}

const BentoModal = forwardRef(BentoModalWithRef);
BentoModal.displayName = 'BentoModal'; // Make findable for tests.
export {BentoModal};

import * as Preact from '#preact';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from '#preact';
import {forwardRef} from '#preact/compat';
import {ContainWrapper} from '#preact/component';
/**
 * @param {!BentoDismiss.Props} props
 * @param {{current: ?BentoDismissDef.BentoDismissApi}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoDismissWithRef(
  {children, dismissButton, expires, once, onceAday, untilDismissed, ...rest},
  ref
) {
  const [dismissed, setDismissed] = useState(true);

  const dismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem('bento-dismiss:dismissed', 'true');
  }, []);

  /** Dismiss Component - API Functions */
  useImperativeHandle(
    ref,
    () =>
      /** @type {!BentoDismissDef.BentoDismissApi} */ ({
        dismiss,
      }),
    [dismiss]
  );

  useEffect(() => {
    if (onceAday) {
      const storedTimestamp = localStorage.getItem('bento-dismiss:once-a-day');
      const date = new Date();
      const today =
        date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      if (storedTimestamp === null) {
        /** Once is not set */
        setDismissed(false);
        localStorage.setItem(
          'bento-dismiss:once-a-day',
          date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        );
      } else if (storedTimestamp !== today) {
        /** Once !== today */
        setDismissed(false);
        localStorage.setItem(
          'bento-dismiss:once-a-day',
          date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        );
      } else {
        /** Showed once! Do nothing. */
      }
    } else if (once) {
      if (localStorage.getItem('bento-dismiss:once') === null) {
        setDismissed(false);
        localStorage.setItem('bento-dismiss:once', true);
      }
    } else if (untilDismissed) {
      /** Expires RESET 'untilDismissed' once timestamp reaches */
      if (expires) {
        /** Expires Logic Goes Here */
        const oldExpires = localStorage.getItem(
          'bento-dismiss:dismiss.expires.timestamp'
        );

        if (oldExpires !== expires) {
          localStorage.removeItem('bento-dismiss:dismiss.expires.next');
          localStorage.removeItem('bento-dismiss:dismiss.expires.timestamp');
          localStorage.setItem(
            'bento-dismiss:dismiss.expires.timestamp',
            expires
          );
        }

        const oldTimestamp = localStorage.getItem(
          'bento-dismiss:dismiss.expires.next'
        );
        if (oldTimestamp === null) {
          /** Timestamp is not set */
          setDismissed(false);
          const newExpirationTs = Date.now() + parseInt(expires, 10);
          localStorage.setItem(
            'bento-dismiss:dismiss.expires.next',
            newExpirationTs
          );
        } else {
          /** Timestamp already set */
          const timestampDifference = Date.now() - parseInt(oldTimestamp, 10);
          if (timestampDifference >= 0) {
            setDismissed(false);
            localStorage.removeItem('bento-dismiss:dismissed');
            localStorage.removeItem('bento-dismiss:dismiss.expires.next');
          }
        }
      } else {
        if (localStorage.getItem('bento-dismiss:dismissed') === null) {
          setDismissed(false);
        }
      }
    }
  }, [expires, once, onceAday, untilDismissed]);

  return (
    <ContainWrapper layout size paint {...rest}>
      {!dismissed && children}
    </ContainWrapper>
  );
}

const BentoDismiss = forwardRef(BentoDismissWithRef);
BentoDismiss.displayName = 'BentoDismiss'; // Make findable for tests.
export {BentoDismiss};

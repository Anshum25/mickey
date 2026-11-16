import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'copied' | 'error';

/**
 * Copy helper with a legacy fallback, because `navigator.clipboard` is absent
 * on insecure origins and in some in-app browsers.
 */
export function useCopyToClipboard(resetAfter = 1800) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      const schedule = (next: Status) => {
        setStatus(next);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setStatus('idle'), resetAfter);
      };

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          schedule('copied');
          return true;
        }
        throw new Error('Clipboard API unavailable');
      } catch {
        // Fallback: a hidden textarea plus execCommand.
        try {
          const el = document.createElement('textarea');
          el.value = text;
          el.setAttribute('readonly', '');
          el.style.position = 'fixed';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          document.body.appendChild(el);
          el.select();
          const ok = document.execCommand('copy');
          document.body.removeChild(el);
          schedule(ok ? 'copied' : 'error');
          return ok;
        } catch {
          schedule('error');
          return false;
        }
      }
    },
    [resetAfter],
  );

  return { copy, status };
}

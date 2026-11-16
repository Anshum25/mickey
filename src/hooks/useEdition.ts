import { useCallback, useEffect, useState } from 'react';

export type Edition = 'day' | 'night';

const KEY = 'anshum-edition';

/** Reading or writing storage throws in private windows and sandboxed frames. */
function readStored(): Edition | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'day' || v === 'night' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Day edition on newsprint, night edition with the inks reversed.
 *
 * Defaults to the reader's system preference, then remembers their choice.
 * The attribute lands on `<html>`, where the token overrides in the
 * stylesheet re-ink every utility at once.
 */
export function useEdition() {
  const [edition, setEdition] = useState<Edition>(() => {
    if (typeof window === 'undefined') return 'day';
    const stored = readStored();
    if (stored) return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = edition;
    document.documentElement.style.colorScheme = edition === 'night' ? 'dark' : 'light';
    try {
      window.localStorage.setItem(KEY, edition);
    } catch {
      /* Storage unavailable — the choice simply does not persist. */
    }
  }, [edition]);

  const toggle = useCallback(() => setEdition((e) => (e === 'day' ? 'night' : 'day')), []);

  return { edition, toggle };
}

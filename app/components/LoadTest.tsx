'use client';

import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../i18n/ui';

// Measured Al Hdeed figures; the same numbers appear in the impact metrics in data.ts.
const CAPACITY = { before: 16.7, after: 60 };
const QUERIES = { before: 225, after: 131 };

type Stage = 'idle' | 'before' | 'after';

function Count({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [value, setValue] = useState(to);
  const current = useRef(to);
  useEffect(() => {
    const controls = animate(current.current, to, {
      duration: 1.2, ease: [.16, 1, .3, 1],
      onUpdate: latest => { current.current = latest; setValue(latest); }
    });
    return () => controls.stop();
  }, [to]);
  return <bdi className="ltr">{value.toFixed(decimals)}</bdi>;
}

/** Replays the production load test: traffic stalls at the old ceiling, then climbs once the fix lands. */
export default function LoadTest({ labels }: { labels: Dictionary['loadTest'] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: .6 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>('idle');
  const timer = useRef<number>(undefined);

  const run = useCallback(() => {
    window.clearTimeout(timer.current);
    setStage('before');
    timer.current = window.setTimeout(() => setStage('after'), 2400);
  }, []);

  useEffect(() => {
    if (reduced) setStage('after');
    else if (inView) run();
    return () => window.clearTimeout(timer.current);
  }, [inView, reduced, run]);

  const after = stage === 'after';
  const capacity = stage === 'idle' ? 0 : after ? CAPACITY.after : CAPACITY.before;
  const queries = after ? QUERIES.after : QUERIES.before;
  const ease = [.16, 1, .3, 1] as const;

  return <figure ref={ref} className={`load-test ${stage}`}>
    <figcaption>
      <span>{labels.title}</span>
      <button type="button" onClick={run} disabled={stage === 'before'}><RotateCcw size={14} aria-hidden="true"/>{labels.replay}</button>
    </figcaption>

    <div className="meter">
      <div className="meter-head"><span>{labels.capacity}</span><b><Count to={capacity} decimals={1}/> {labels.unit}</b></div>
      <div className="track">
        <motion.i className="fill" animate={{ width: `${(capacity / CAPACITY.after) * 100}%` }} transition={{ duration: stage === 'before' ? 1.4 : 1.2, ease }}/>
        <span className="ceiling" style={{ insetInlineStart: `${(CAPACITY.before / CAPACITY.after) * 100}%` }} aria-hidden="true"/>
      </div>
    </div>

    <div className="meter">
      <div className="meter-head"><span>{labels.queries}</span><b><Count to={queries}/></b></div>
      <div className="track">
        <motion.i className="fill quiet" animate={{ width: `${(queries / QUERIES.before) * 100}%` }} transition={{ duration: 1.2, ease }}/>
      </div>
    </div>

    <p className="load-status" aria-live="polite">{after ? labels.after : stage === 'before' ? labels.before : ' '}</p>
    <p className="load-source">{labels.source}</p>
  </figure>;
}

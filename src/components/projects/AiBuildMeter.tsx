import { useEffect, useRef, useState } from 'react';

interface Props {
  assist: number;
  tools: string[];
  human: string;
  size?: 'compact' | 'large';
}

export default function AiBuildMeter({ assist, tools, human, size = 'compact' }: Props) {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`meter meter-${size}`}>
      <div className="meter-labels">
        <span className="meter-label-ai">AI-assisted {assist}%</span>
        <span className="meter-label-human">Human {100 - assist}%</span>
      </div>
      <div
        ref={barRef}
        className="meter-bar"
        role="img"
        aria-label={`Build recipe: ${assist} percent AI-assisted, ${100 - assist} percent human`}
      >
        <span className="meter-fill" style={{ width: visible ? `${assist}%` : '0%' }} />
      </div>
      <details className="meter-details">
        <summary>Build recipe</summary>
        <p>
          <strong>AI:</strong> {tools.join(' · ')}
        </p>
        <p>
          <strong>Human:</strong> {human}
        </p>
        {size === 'large' ? (
          <p className="meter-motto">
            AI wrote the code. I wrote the spec, made the calls, and shipped it.
          </p>
        ) : null}
      </details>
    </div>
  );
}

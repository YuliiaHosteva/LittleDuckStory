import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';

// твої сцени
import FirstScene from '../FirstScene/FirstScene.jsx';
import SecondScene from '../SecondScene/SecondScene.jsx';
import ThirdScene from '../ThirdScene/ThirdScene.jsx';
import FourthScene from '../FourthScene/FourthScene.jsx';
import FifthScene from '../FifthScene/FifthScene.jsx';

import css from './Story.module.css';

const scenes = [FirstScene, SecondScene, ThirdScene, FourthScene, FifthScene]; 

export default function Story() {
  const [idx, setIdx] = useState(0);
  const Scene = useMemo(() => scenes[idx], [idx]);

  // плавний перехід між сценами
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('#scene-root', { autoAlpha: 0, y: 10, scale: 0.995 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
    return () => gsap.to('#scene-root', { autoAlpha: 0, y: -10, duration: 0.25, ease: 'power2.in' });
  }, [idx]);

  // preload наступної сцени (щоб не було миготіння)
  useEffect(() => {
    const next = idx + 1;
    if (next < scenes.length) {
      const imgs = document.querySelectorAll(`#scene-root img`);
      imgs.forEach(img => new Image().src = img.currentSrc || img.src);
    }
  }, [idx]);

  return (
    <div className={css.shell}>
      <div id="scene-root" className={css.stage}>
        <Scene />
      </div>

      <div className={css.navOverlay}>
        <button
          className={css.btn}
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          aria-label="Zurück"
        >←</button>

        <div className={css.progress}>{idx + 1} / {scenes.length}</div>

        <button
          className={css.btn}
          onClick={() => setIdx(i => Math.min(scenes.length - 1, i + 1))}
          disabled={idx === scenes.length - 1}
          aria-label="Weiter"
        >→</button>
      </div>
    </div>
  );
}

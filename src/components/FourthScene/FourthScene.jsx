import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import css from './FourthScene.module.css';

// === assets (Scene4) ===
import fish1      from '../../assets/Scene4/Fisch1.png';
import fish2      from '../../assets/Scene4/Fisch2.png';
import fishSmall  from '../../assets/Scene4/little_fisch.png';
import eel        from '../../assets/Scene4/Eel_underwater.png';
import centipede  from '../../assets/Scene4/Centipede.png';
import snail      from '../../assets/Scene4/snail.png';
import waterDuck  from '../../assets/Scene4/water_duck.png';
import bottom     from '../../assets/Scene4/bottom.png';

import g1 from '../../assets/Scene4/grass1.png';
import g2 from '../../assets/Scene4/grass2.png';
import g3 from '../../assets/Scene4/grass3.png';
import g4 from '../../assets/Scene4/grass4.png';
import g5 from '../../assets/Scene4/grass5.png';
import g6 from '../../assets/Scene4/grass6.png';

import sun   from '../../assets/Scene4/sun.png';
import cloud from '../../assets/Scene4/Cloud.png';

export default function FourthScene() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // вхід сцени
      gsap.set(`.${css.caption}`, { y: 18, opacity: 0 });
      gsap.set([`.${css.fish}`, `.${css.creep}`, `.${css.duck}`], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(`.${css.frame}`, { scale: 1.03 }, { scale: 1, duration: 0.8 })
        .to([`.${css.plant}`], { opacity: 1, duration: 0.3 }, '-=0.5')
        .to([`.${css.fish}`, `.${css.creep}`, `.${css.duck}`], { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
        .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.45 }, '-=0.2');

      // легке колихання водоростей
      gsap.to(`.${css.plant}`, {
        rotation: (i) => (i % 2 ? 1.6 : -1.2),
        transformOrigin: '50% 100%',
        duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut',
        stagger: { each: .2, from: 'random' }
      });

      // сонце/хмарка
      gsap.to(`.${css.cloud}`, { x: '+=24', y: '-=6', duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(`.${css.sun}`,   { y: '-=4',  duration: 6,  repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // каченя під водою + бульбашки
      gsap.to([`.${css.duck}`, `.${css.fishBig}`, `.${css.fishMid}`], { y: '+=12', rotation: -8, transformOrigin:'55% 40%', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      const bubbles = gsap.utils.toArray(`.${css.duckBubbles} span`);
      bubbles.forEach((el, i) => {
        const loop = () => {
          gsap.set(el, { x: gsap.utils.random(-10, 16), y: gsap.utils.random(6, 18), scale: gsap.utils.random(.4, .9), opacity:.0 });
          gsap.to(el, { y: '-=46', opacity: .9, duration: gsap.utils.random(1.2, 2.0), ease: 'sine.out',
            onComplete: () => gsap.to(el, { opacity: 0, duration: .4, onComplete: loop })
          });
        };
        gsap.delayedCall(i * 0.25, loop);
      });

      // риби — нескінченне плавання з «гойдалкою»
      const frame = root.current.getBoundingClientRect();
      const swimAcross = (el, opts = {}) => {
        const {
          fromLeft = true,
          yMin = frame.height * 0.22,
          yMax = frame.height * 0.52,
          amplitude = 14,
          size = 1,
          pxPerSec = 55,
          bobDur = 1.2
        } = opts;

        const startX = fromLeft ? -120 : frame.width + 120;
        const endX   = fromLeft ? frame.width + 120 : -120;
        const dist = Math.abs(endX - startX);
        const baseDur = dist / pxPerSec; 

        const loop = () => {
          const y = gsap.utils.random(yMin, yMax);
          const dur = baseDur + gsap.utils.random(-1, 1);
          gsap.set(el, { 
            x: startX, 
            y, 
            scaleX: (fromLeft ? -1 : 1) * size,
            scaleY: size,
             rotate: fromLeft ? 0 : 0 });
          // вертикальна «гойдалка»
          gsap.to(el, { y: y + (fromLeft ? -amplitude : amplitude), duration: bobDur, repeat: -1, yoyo: true, ease:'sine.inOut' });
          // пливемо поперек
          gsap.to(el, { x: endX, duration: dur, ease: 'none', onComplete: loop });
        };
        loop();
      };

      gsap.utils.toArray(`.${css.school} img`).forEach((el, i) => {
        swimAcross(el, { 
            fromLeft: i % 2 === 0, 
            pxPerSec: 70,
            bobDur: 1, 
            amplitude: 14,
            size: 0.45 });
      });


    

      // вугор — хвилею по низу
      const eelEl = document.querySelector(`.${css.eel}`);
      if (eelEl) {
        const loopEel = () => {
          const y = frame.height * gsap.utils.random(0.70, 0.84);
          const dur = gsap.utils.random(12, 18);
          gsap.set(eelEl, { x: frame.width + 160, y, rotation: 0 });
          gsap.to(eelEl, { x: -160, duration: dur, ease: 'none', onComplete: loopEel });
          gsap.to(eelEl, { y: y + 12, rotation: -3, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        };
        loopEel();
      }

      // «повзучі» на дні
      gsap.to(`.${css.snail}`,     { x: '+=40', duration: 24, repeat: -1, yoyo: true, ease: 'none' });
      gsap.to(`.${css.centipede}`, { x: '-=60', duration: 18, repeat: -1, yoyo: true, ease: 'none' });

    }, root);
    return () => ctx.revert();
  }, []);

  // легкий паралакс (фон/рослини)
  const onParallax = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(`.${css.haze}`,  { x: cx * 10, y: cy * 6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.plant}`, { x: cx * 6,  y: cy * 6,  duration: .5, ease:'sine.out' });
  };

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={onParallax}>

        {/* небо/вода + легка імла та відблиски */}
        <div className={css.haze} aria-hidden />
        <div className={css.waterFx} aria-hidden />
        <div className={css.surfaceBand} aria-hidden />
        <img className={css.sun} src={sun} alt="" aria-hidden />
        <img className={css.cloud} src={cloud} alt="" aria-hidden />

        {/* дно */}
        <div className={css.bg} aria-hidden />
        <img className={css.bottom} src={bottom} alt="" aria-hidden />
       
        {/* рослини (ліворуч/праворуч) */}
        <img className={`${css.plant} ${css.pL1}`} src={g1} alt="" />
        <img className={`${css.plant} ${css.pL2}`} src={g3} alt="" />
        <img className={`${css.plant} ${css.pL3}`} src={g2} alt="" />
        <img className={`${css.plant} ${css.pR1}`} src={g4} alt="" />
        <img className={`${css.plant} ${css.pR2}`} src={g5} alt="" />
        <img className={`${css.plant} ${css.pR3}`} src={g6} alt="" />

        {/* рибки: велика + середня + косяк маленьких */}
        <img className={`${css.fish} ${css.fishBig}`} src={fish1} alt="" />
        <img className={`${css.fish} ${css.fishMid}`} src={fish2} alt="" />
        <div className={`${css.fish} ${css.school}`} aria-hidden>
          {Array.from({length: 8}).map((_,i)=>(
            <img key={i} src={fishSmall} alt="" />
          ))}
        </div>

        {/* інші мешканці */}
        <img className={`${css.creep} ${css.eel}`}       src={eel}       alt="" />
        <img className={`${css.creep} ${css.centipede}`} src={centipede} alt="" />
        <img className={`${css.creep} ${css.snail}`}     src={snail}     alt="" />

        {/* каченя під водою + бульбашки */}
        <div className={css.duckWrap}>
          <img className={`${css.duck}`} src={waterDuck} alt="Küken" />
          <div className={css.surfaceRing} aria-hidden />
          <div className={css.duckBubbles} aria-hidden>
            {Array.from({length: 6}).map((_,i)=><span key={i} />)}
          </div>
        </div>

        {/* накладка води + блиск поверхні */}
        <div className={css.waterOverlay} aria-hidden>
        </div>
        <div className={css.surfaceShine} aria-hidden />

        {/* текст */}
        <p className={css.caption}>
          “Hallo, ihr lieben Fische!”,<br/>
          ruft das Küken.<br/>
          “Kommt, wir schwimmen auf und ab!”
        </p>

      </div>
    </div>
  );
}
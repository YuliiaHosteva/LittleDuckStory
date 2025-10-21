import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import css from './FifthScene.module.css';

import mama from '../../assets/Scene5/mama_duck.png';
import duck from '../../assets/Scene5/duck_scene5.png';

// рослини/декор із Scene1
import reeds    from '../../assets/Scene1/reeds.png';
import iris     from '../../assets/Scene1/iris.png';
import lotus    from '../../assets/Scene1/lotus.png';
import daisy    from '../../assets/Scene1/daisy.png';
import ladybug  from '../../assets/Scene1/ladybug.png';
import bflyBlue from '../../assets/Scene1/butterfly_blue.png';
import bflyOrg  from '../../assets/Scene1/butterfly_orange.png';
import waterTex from '../../assets/Scene1/water.png';

export default function FifthScene() {
  const root   = useRef(null);
  const sfxRef = useRef(null); // .waterFx

  useLayoutEffect(() => {
    // === NEW: функція ставить .waterFx .at у точку дотику під мамою ===
    const positionTouchAnchor = () => {
      const frameEl = root.current;
      const fxEl    = sfxRef.current;
      if (!frameEl || !fxEl) return;

      const frameRect = frameEl.getBoundingClientRect();
      const q = (sel) => frameEl.querySelector(sel);
      const mamaEl = q (`.${css.mama}`);
      const atEl   = fxEl.querySelector(`.${css.at}`);
      if (!mamaEl || !atEl) return;

      const mr = mamaEl.getBoundingClientRect();
      // підправляй 0.45 / 0.62 під своє PNG (точка лап)
      const px = mr.left + mr.width  * 0.45;
      const py = mr.top  + mr.height * 0.62;

      gsap.set(atEl, { x: px - frameRect.left, y: py - frameRect.top });
    };

    // === NEW: стабільний resize-хендлер ===
    const onResize = () => positionTouchAnchor();

    const ctx = gsap.context(() => {
      const rand = gsap.utils.random;

      // --- ефекти води ---
      const showSubmergeCap = () => {
        const cap = sfxRef.current?.querySelector(`.${css.submergeCap}`);
        if (!cap) return;
        gsap.set(cap, { y: '+=6', scaleX:.9, scaleY:.8, opacity:0 });
        gsap.to(cap, { opacity:.9, duration:.12, ease:'power1.out' });
        gsap.to(cap, { opacity:0,  duration:.55, ease:'power1.in', delay:.35 });
      };

      const splashOnce = () => {
        const wrap = sfxRef.current;
        if (!wrap) return;

        const r1    = wrap.querySelector(`.${css.r1}`);
        const r2    = wrap.querySelector(`.${css.r2}`);
        const wake  = wrap.querySelector(`.${css.wake}`);
        const shine = wrap.querySelector(`.${css.surfaceShine}`);
        const drops = gsap.utils.toArray(wrap.querySelectorAll(`.${css.drop}`));

        gsap.fromTo(r1, { scaleX:.75, scaleY:.75, opacity:.35 },
                         { scaleX:1.28, scaleY:1.06, opacity:0, duration:1.2, ease:'sine.out' });
        gsap.fromTo(r2, { scaleX:.9,  scaleY:.85, opacity:.25 },
                         { scaleX:1.35, scaleY:1.10, opacity:0, duration:1.4, ease:'sine.out', delay:.12 });

        gsap.fromTo(wake,  { opacity:.35, scaleX:.85, scaleY:.9 },
                           { opacity:0,   scaleX:1.35, scaleY:1.05, duration:1.6, ease:'sine.out' });

        gsap.fromTo(shine, { opacity:.6, scaleX:.7 },
                           { opacity:0,  scaleX:1.2,  duration:.55, ease:'power1.out' });

        gsap.set(drops, { x:0, y:0, rotate:0, opacity:1, scale:1, autoAlpha:0 });
        drops.forEach((el, i) => {
          const ang  = rand(-115, -65)();
          const dist = rand(80, 160)();
          const rad  = ang * Math.PI / 180;
          const tx   = Math.cos(rad) * dist;
          const ty   = Math.sin(rad) * dist;

            gsap.timeline({ defaults:{ overwrite:true } })
            .set(el, { autoAlpha: 1 }) // зробити видимою перед пострілом
            .to(el, {
            x: tx, y: ty - 20, rotation: rand(-30,30)(),
            duration: .35, ease: 'power2.out', delay: i * 0.015
            })
            .to(el, {
            y: `+=${rand(90,140)()}`, autoAlpha: 0,
            duration: .55, ease: 'power1.in'
            }, "<+.35")
            .set(el, { clearProps: "all" }); // прибрати інлайнові стилі для наступного сплеску
        });
      };

      // --- стартові стани ---
      gsap.set(`.${css.caption}`, { y: 18, opacity: 0 });
      gsap.set(`.${css.duck}`,    { y: 8,  opacity: 0 });
      gsap.set(`.${css.mama}`,    { opacity: 0, x: -380, y: -260, rotation: 8, scale: 1.06 });

      // вхід сцени
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(`.${css.frame}`, { scale: 1.03 }, { scale: 1, duration: 0.8 })
        .to(`.${css.duck}`,    { opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
        .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3');

      // каченя — погойдування
      gsap.to(`.${css.duck}`, { y: '+=6', repeat: -1, yoyo: true, duration: 1.8, ease: 'sine.inOut' });

      // вода (текстура)
      gsap.to(`.${css.waterTex}`, { backgroundPosition: '+=120px 0', repeat: -1, duration: 14, ease: 'none' });

      // метелики
      gsap.set([`.${css.bflyBlue}`, `.${css.bflyOrg}`], { opacity: 0, x: 0, y: 0 });
      gsap.to([`.${css.bflyBlue}`, `.${css.bflyOrg}`], { opacity: 1, duration: .2, delay: .4 });
      gsap.to(`.${css.bflyBlue}`, {
        keyframes: [
          { x:-40, y:-20, rotation: 0, duration: 1.1 },
          { x:  0, y:  0, rotation: 6, duration: 1.1 },
          { x: 60, y:-30, rotation:-6, duration: 1.1 },
        ],
        repeat: -1, yoyo: true
      });
      gsap.to(`.${css.bflyOrg}`, {
        keyframes: [
          { x: 40, y:-10, rotation: 0, duration: 1.1 },
          { x:  0, y: 10, rotation:-6, duration: 1.1 },
          { x:-60, y:-20, rotation: 6, duration: 1.1 },
        ],
        repeat: -1, yoyo: true, delay:.5
      });

      // --- ПОСАДКА МАМИ ---
      const landTL = gsap.timeline({ defaults: { ease: 'power2.out' } });
      landTL
        .to(`.${css.mama}`, { opacity: 1, duration: 0.1 }, 0)
        .to(`.${css.mama}`, {
          keyframes: [
            { x:-160, y:-160, rotation: 6, scale: 1.04, duration: .45, ease:'power1.out' },
            { x: -40, y: -60, rotation: 3, scale: 1.02, duration: .35 },
            { x:   0, y:  10, rotation: 0, scale: 1.00, duration: .25 },
          ]
        }, 0)
        .to(`.${css.mama}`, { y: '+=18', scaleY:.94, scaleX:1.05, duration:.18, ease:'power2.in' })
        .to(`.${css.mama}`, { y: '-=16', scaleY:1,    scaleX:1,    duration:.32, ease:'power2.out' })
        .add(() => {
          // NEW: якір ставимо саме тут + ефекти
          positionTouchAnchor();
          showSubmergeCap();
          splashOnce();
          gsap.to(`.${css.mama}`, { y: '+=4', repeat: -1, yoyo: true, duration: 2.2, ease: 'sine.inOut' });
        });

      tl.add(landTL, '>-0.2');

      // вітер
      gsap.to(`.${css.reeds}`, { rotation: 1.4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(`.${css.pos}`,   { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(`.${css.lotus}`, { rotation: 1.2, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6 });
      gsap.to(`.${css.daisy}`, { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 });
    }, root);

    // === NEW: підписка на resize один раз ===
    window.addEventListener('resize', onResize);

    // cleanup: спочатку відпишись, потім прибери GSAP
    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, []);

  // паралакс передніх рослин
  const onParallax = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(`.${css.daisy}`, { x: cx*6, y: cy*4, duration: .5, ease:'sine.out' });
    gsap.to(`.${css.reeds}`, { x: cx*6, y: cy*4, duration: .5, ease:'sine.out' });
  };

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={onParallax}>
        {/* вода */}
        <div className={css.water} aria-hidden />
        <div className={css.waterTex} style={{ backgroundImage: `url(${waterTex})` }} />

        {/* персонажі */}
        <img className={css.duck} src={duck} alt="Küken" />
        <div className={css.mama}>
          <img className={css.mamaImg} src={mama} alt="Mama" />
        </div>

        {/* рослини/декор */}
        <img className={css.reeds} src={reeds} alt="" />
        <div className={css.pos}>
          <img className={css.iris} src={iris} alt="" />
        </div>
        <img className={css.lotus} src={lotus} alt="" />
        <img className={css.daisy} src={daisy} alt="" />


        {/* ефекти поверхні */}
        <div ref={sfxRef} className={css.waterFx} aria-hidden>
          <div className={css.at}>
            <span className={`${css.ring} ${css.r1}`} />
            <span className={`${css.ring} ${css.r2}`} />
            <span className={css.wake} />
            <span className={css.submergeCap} />
            <span className={css.surfaceShine} />
            <div className={css.splash}>
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} className={css.drop} />
              ))}
            </div>
          </div>
        </div>

        {/* метелики/сонечко */}
        <img className={css.bflyBlue} src={bflyBlue} alt="" />
        <img className={css.bflyOrg}  src={bflyOrg}  alt="" />
        <img className={css.ladybug}  src={ladybug} alt="" />

        {/* текст */}
        <p className={`${css.caption} ${css.topCenter}`}>
          “Hallo, Küken!”,<br/>flüstert Mama.<br/>“Du bist das Beste, was ich hab!”
        </p>
      </div>
    </div>
  );
}
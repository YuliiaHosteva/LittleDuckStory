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
  const frameEl = root.current;
  const sfxEl   = sfxRef.current;

  // — позиціонуємо .waterFx .at під лапами мами
  const positionTouchAnchor = () => {
    if (!frameEl || !sfxEl) return;
    const mamaEl = frameEl.querySelector(`.${css.mamaImg}`) || frameEl.querySelector(`.${css.mama}`);
    const atEl   = sfxEl.querySelector(`.${css.at}`);
    if (!mamaEl || !atEl) return;

    const fr = frameEl.getBoundingClientRect();
    const mr = mamaEl.getBoundingClientRect();
    const px = mr.left + mr.width  * 0.26; // 
    const py = mr.top  + mr.height * 0.76;
    gsap.set(atEl, { x: px - fr.left, y: py - fr.top });
  };

  const onResize = () => positionTouchAnchor();

  const ctx = gsap.context(() => {
    // стартові стани
    gsap.set(`.${css.caption}`, { y: 18, opacity: 0 });
    gsap.set(`.${css.duck}`,  { opacity: 1, xPercent:  280 });
    gsap.set(`.${css.mama}`,  { opacity: 1, xPercent: -180 });

    // вода
    gsap.to(`.${css.waterTex}`, { backgroundPosition: '+=120px 0', repeat: -1, duration: 14, ease: 'none' });

    // метелики 
    gsap.set([`.${css.bflyBlue}`, `.${css.bflyOrg}`], { opacity: 0, x: 0, y: 0 });
    gsap.to([`.${css.bflyBlue}`, `.${css.bflyOrg}`], { opacity: 1, duration: .2, delay: .4 });
    gsap.to(`.${css.bflyBlue}`, {
      keyframes: [{x:-40,y:-20,rotation:0,duration:1.1},{x:0,y:0,rotation:6,duration:1.1},{x:60,y:-30,rotation:-6,duration:1.1}],
      repeat:-1, yoyo:true
    });
    gsap.to(`.${css.bflyOrg}`, {
      keyframes: [{x:40,y:-10,rotation:0,duration:1.1},{x:0,y:10,rotation:-6,duration:1.1},{x:-60,y:-20,rotation:6,duration:1.1}],
      repeat:-1, yoyo:true, delay:.5
    });

    // таймлайн входу+припливу
    gsap.timeline({ defaults: { ease: 'power2.out' } })
      .fromTo(`.${css.frame}`, { scale: 1.03 }, { scale: 1, duration: 0.8 }, 0)
      .to(`.${css.duck}`,  { xPercent: 0, duration: 4.0, ease: 'power1.inOut' }, 0)
      .to(`.${css.mama}`,  { xPercent: 0, duration: 4.0, ease: 'power1.inOut', onUpdate: positionTouchAnchor }, 0)
      .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
      .add(() => {
        // нескінченні гойдалки + тримаємо якір
        gsap.to(`.${css.mama}`, { y: '+=4', repeat: -1, yoyo: true, duration: 2.2, ease: 'sine.inOut', onUpdate: positionTouchAnchor });
        gsap.to(`.${css.duck}`, { y: '+=6', repeat: -1, yoyo: true, duration: 1.8, ease: 'sine.inOut' });
      });

    // легкий «вітер»
    gsap.to(`.${css.reeds}`, { rotation: 1.4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(`.${css.pos}`,   { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(`.${css.lotus}`, { rotation: 1.2, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6 });
    gsap.to(`.${css.daisy}`, { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 });
  }, root);

  window.addEventListener('resize', onResize);
  positionTouchAnchor();

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
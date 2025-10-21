import css from './FirstScene.module.css';
import { useLayoutEffect, useRef} from 'react';
import { gsap } from 'gsap';

import duck from '../../assets/Scene1/duck.png';
import duckMama from '../../assets/Scene1/duck_mama.png';
import frog from '../../assets/Scene1/frog.png';
import iris from '../../assets/Scene1/iris.png';
import lotus from '../../assets/Scene1/lotus.png';
import reeds from '../../assets/Scene1/reeds.png';
import dragonfly from '../../assets/Scene1/dragonfly.png';
import ladybug from '../../assets/Scene1/ladybug.png';
import butterflyBlue from '../../assets/Scene1/butterfly_blue.png';
import butterflyOrange from '../../assets/Scene1/butterfly_orange.png';
import waterTex from '../../assets/Scene1/water.png';
import daisy from '../../assets/Scene1/daisy.png';
import stump from '../../assets/Scene1/stump_lake.png';
import flower from '../../assets/Scene2/water_flower.png';
import grassReeds from '../../assets/Scene2/water_reeds.png';
import grass from '../../assets/Scene2/Grass.png';
import lotus2 from '../../assets/Scene1/lotus2.png';
import waterGrass from '../../assets/Scene2/water_grass.png';

export default function FirstScene() {
  const root = useRef(null);


  const duckFloatRef = useRef(null);

  useLayoutEffect(() => {
    const node = root.current;
    let ctx;

    async function ready() {
      // дочекатися всіх <img> всередині сцени
      const imgs = Array.from(node.querySelectorAll('img'));
      await Promise.all(
        imgs.map(img => (img.complete ? Promise.resolve() : img.decode().catch(() => {})))
      );

      // тепер безпечно ініціалізувати анімації
      ctx = gsap.context(() => {
        // стартові стани
        gsap.set(`.${css.caption}`, { y: 20, opacity: 0 });
        gsap.set(`.${css.duck}`, { y: 12, opacity: 0, scale: 0.98 });
        gsap.set(`.${css.mama}`, { y: 8, opacity: 0 });
        gsap.set(`.${css.bflyBlue}`, { x: -120, y: -60, opacity: 0, rotation: -8 });
        gsap.set(`.${css.bflyOrange}`, { x: 120, y: -40, opacity: 0, rotation: 8 });

        // вхід сцени
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo(`.${css.frame}`, { scale: 1.04 }, { scale: 1, duration: 1.0 })
          .to(`.${css.mama}`, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
          .to(`.${css.duck}`, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.4')
          .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
          .to([`.${css.bflyBlue}`, `.${css.bflyOrange}`], { opacity: 1, duration: 0.2 }, '<');

        // нескінченні петлі
        const duckFloat = gsap.to(`.${css.duck}`, {
          y: '+=6', repeat: -1, yoyo: true, duration: 1.8, ease: 'sine.inOut'
        });
        duckFloatRef.current = duckFloat;

        gsap.to(`.${css.mama}`, { y: '+=4', repeat: -1, yoyo: true, duration: 2.4, ease: 'sine.inOut' });
        gsap.to(`.${css.mamaImg}`, {
          rotation: 2, transformOrigin: '60% 40%', repeat: -1, yoyo: true, duration: 3.2, ease: 'sine.inOut'
        });

        // хвильки + текстура води
        const wakeTL = gsap.timeline({ repeat: -1 });
        wakeTL
          .fromTo(`.${css.wake1}`, { scaleX: .9, scaleY: .9, opacity:.35 }, { scaleX: 1.15, scaleY: 1.05, opacity: 0, duration: 1.4, ease: 'sine.out' })
          .fromTo(`.${css.wake2}`, { scaleX: .9, scaleY: .9, opacity:.25 }, { scaleX: 1.2,  scaleY: 1.08, opacity: 0, duration: 1.6, ease: 'sine.out' }, '-=1.1');
        gsap.to(`.${css.waterTex}`, { backgroundPosition: '+=120px 0', repeat: -1, duration: 12, ease: 'none' });

        // метелики
        gsap.to(`.${css.bflyBlue}`, {
          keyframes: [
            { x: -40, y: -20, rotation: 0, duration: 1.1 },
            { x: 0, y: 0, rotation: 6, duration: 1.1 },
            { x: 60, y: -30, rotation: -6, duration: 1.1 }
          ],
          repeat: -1, yoyo: true
        });
        gsap.to(`.${css.bflyOrange}`, {
          keyframes: [
            { x: 40, y: -10, rotation: 0, duration: 1.1 },
            { x: 0, y: 10, rotation: -6, duration: 1.1 },
            { x: -60, y: -20, rotation: 6, duration: 1.1 }
          ],
          repeat: -1, yoyo: true, delay: .5
        });

        // стрекоза — вісімка по всьому кадру
        const frame = node.getBoundingClientRect();
        const ax = frame.width * 0.35;
        const ay = frame.height * 0.25;
        gsap.to(`.${css.dragonfly}`, {
          duration: 10,
          repeat: -1,
          ease: 'none',
          keyframes: [
            { x:  0,   y:  ay },
            { x: +ax,  y:   0 },
            { x:  0,   y: +ay },
            { x: -ax,  y:   0 },
            { x:  0,   y: -ay },
          ]
        });

        // легкий вітер
        gsap.to(`.${css.reeds}`, { rotation: 1.4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(`.${css.pos}`,   { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(`.${css.lotus}`, { rotation: 1.2, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6 });
        gsap.to(`.${css.daisy}`, { rotation: 1.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 });

        // hover на мамі
        const el = node.querySelector(`.${css.mamaImg}`);
        el?.addEventListener('mouseenter', () => gsap.to(el, { rotation: 4, duration:.25, ease:'sine.out' }));
        el?.addEventListener('mouseleave', () => gsap.to(el, { rotation: 2, duration:.25, ease:'sine.out' }));
      }, node);
    }

    ready();
    return () => ctx?.revert();
  }, []);
  // =====================================================================


  function handleParallax(e){
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left)/r.width - 0.5;
    const cy = (e.clientY - r.top)/r.height - 0.5;
    gsap.to(`.${css.lotus}`,      { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.daisy}`,      { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.iris}`,       { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.reeds}`,      { x: cx*4,  y: cy*3,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.waterGrass}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.grassReeds}`, { x: cx*8,  y: cy*4,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.frog}`,       { x: cx*2,  y: cy*1,  duration: .5, ease:'sine.out' });
  }

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={handleParallax}>
        <div  className={css.water} />
        <div className={css.waterTex} style={{ backgroundImage: `url(${waterTex})` }} />

        <div  className={css.dragArea} aria-hidden />

        {/* рослини */}
        <img className={css.reeds} src={reeds} alt="" />
        <img  className={css.lotus + ' ' + css.draggable} src={lotus} alt="Lotus" />
        <img className={css.daisy} src={daisy} alt="" />
        <img className={css.flower} src={flower} alt="" />
        <img className={css.grassReeds} src={grassReeds} alt="" />
        <img className={css.grass} src={grass} alt="" />
        <img className={css.lotus2} src={lotus2} alt="" />
        <img className={css.waterGrass} src={waterGrass} alt="" />
        <img className={css.stump} src={stump} alt="" />
        <div className={css.pos}>
          <img className={css.iris} src={iris} alt="" />
        </div>

        {/* персонажі */}
        <div className={css.mama}>
          <img className={css.mamaImg} src={duckMama} alt="Mama duck" />
          <img  className={css.frog} src={frog} alt="Frog" />
        </div>
        <img className={css.duck + ' ' + css.draggable} src={duck} alt="Duck" />

        {/* хвильки */}
        <span className={`${css.wake} ${css.wake1}`} aria-hidden="true" />
        <span className={`${css.wake} ${css.wake2}`} aria-hidden="true" />


        {/* комахи */}
        <img className={css.bflyBlue} src={butterflyBlue} alt="" />
        <img className={css.bflyOrange} src={butterflyOrange} alt="" />
        <img className={css.ladybug} src={ladybug} alt="" />
        <img className={css.dragonfly} src={dragonfly} alt="" />

        {/* текст */}
        <p className={`${css.caption} ${css.topCenter}`}>Hallo, Küken!</p>
        <div className={css.noise} />
      </div>
    </div>
  );
}

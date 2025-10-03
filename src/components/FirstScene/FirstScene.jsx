import css from './FirstScene.module.css';
import { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';


import duck from '../../assets/Scene1/duck.png'
import duckMama from '../../assets/Scene1/duck_mama.png';
import frog from '../../assets/Scene1/frog.png';
import iris from '../../assets/Scene1/iris.png';
import lotus from '../../assets/Scene1/lotus.png';
import reeds from '../../assets/Scene1/reeds.png';
// import dragonfly from '../../assets/Scene1/dragonfly.png';
import ladybug from '../../assets/Scene1/ladybug.png';
import butterflyBlue from '../../assets/Scene1/butterfly_blue.png';
import butterflyOrange from '../../assets/Scene1/butterfly_orange.png';
// import butterflyRed from '../../assets/Scene1/butterfly_red.png';
// import grasshopper from '../../assets/Scene1/grasshopper.png';
import waterTex from '../../assets/Scene1/water.png';
import daisy from '../../assets/Scene1/daisy.png';
import house from '../../assets/Scene1/duck_house.png';
import flower from '../../assets/Scene2/water_flower.png';
import grassReeds from '../../assets/Scene2/water_reeds.png';
import grass from '../../assets/Scene2/Grass.png';
import lotus2 from '../../assets/Scene1/lotus2.png';
import waterGrass from '../../assets/Scene2/water_grass.png';



export default function FirstScene() {
  const root = useRef(null);

   // draggable елементи
  const waterRef = useRef(null);
  const duckRef  = useRef(null);
  const lotusRef = useRef(null);
  const dragRef  = useRef(null);

   const duckFloatRef = useRef(null);

  function useDraggable(elRef, boundsRef, frameRef, opts = {}) {
  useEffect(() => {
    const el = elRef.current;
    // const prevZ = { value: '' };
    const bounds = boundsRef.current;
    const frame = frameRef.current;
    if (!el || !bounds || !frame) return;

    let down = false;

    const onDown = (e) => {
      down = true;
      el.setPointerCapture?.(e.pointerId);
      el.style.bottom = 'auto';
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
      // prevZ.value = el.style.zIndex;
      // el.style.zIndex = '999';
      opts.onStart?.();
      
    };

    const onMove = (e) => {
      if (!down) return;
      const fr = frame.getBoundingClientRect();
      const b  = bounds.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX, b.left),  b.right);
      const y = Math.min(Math.max(e.clientY, b.top),   b.bottom);
      const left = ((x - fr.left) / fr.width)  * 100;
      const top  = ((y - fr.top)  / fr.height) * 100;
      el.style.left = `${left}%`;
      el.style.top  = `${top}%`;
    };

    const onUp = (e) => {
      if (!down) return;
      down = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = 'grab';
      // el.style.zIndex = prevZ.value || '';
      opts.onEnd?.();
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [elRef, boundsRef, frameRef, opts]);
}


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
const duckFloat = gsap.to(`.${css.duck}`, { y: '+=6', repeat:-1, yoyo:true, duration:1.8, ease:'sine.inOut' });// 1) плавне погойдування мами (контейнер)
duckFloatRef.current = duckFloat;

gsap.to(`.${css.mama}`, {
  y: '+=4', repeat: -1, yoyo: true, duration: 2.4, ease: 'sine.inOut'
});

// 2) легкий нахил/«дихання» корпусу (тільки картинка)
gsap.to(`.${css.mamaImg}`, {
  rotation: 2, transformOrigin: '60% 40%',
  repeat: -1, yoyo: true, duration: 3.2, ease: 'sine.inOut'
});

// 4) кола на воді — розбігаються й зникають, циклом
const wakeTL = gsap.timeline({ repeat: -1 });
wakeTL
  .fromTo(`.${css.wake1}`, { scaleX: .9, scaleY: .9, opacity:.35 }, { scaleX: 1.15, scaleY: 1.05, opacity: 0, duration: 1.4, ease: 'sine.out' })
  .fromTo(`.${css.wake2}`, { scaleX: .9, scaleY: .9, opacity:.25 }, { scaleX: 1.2,  scaleY: 1.08, opacity: 0, duration: 1.6, ease: 'sine.out' }, '-=1.1');
      gsap.to(`.${css.waterTex}`, { backgroundPosition: '+=120px 0', repeat: -1, duration: 12, ease: 'none' });

      // метелики – плавання “вісімкою”
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
       // 🌬️ легкий вітер
    gsap.to(`.${css.reeds}`, {
      rotation: 1.4,
      duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    // gsap.to(`.${css.iris}`, {
    //   rotation: 1.4,
    //   duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut'
    // });
    gsap.to(`.${css.lotus}`, {
      rotation: 1.2,
      duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6
    });
    // (опціонально) ромашки
    gsap.to(`.${css.daisy}`, {
      rotation: 1.4,
      duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8
    });

    const el = document.querySelector(`.${css.mamaImg}`);
    el?.addEventListener('mouseenter', () => gsap.to(el, { rotation: 4, duration:.25, ease:'sine.out' }));
    el?.addEventListener('mouseleave', () => gsap.to(el, { rotation: 2, duration:.25, ease:'sine.out' }));


    
    }, root);
    return () => ctx.revert();
  }, []);

// ПІСЛЯ ефекту: підключаємо drag
  useDraggable(duckRef,  waterRef, root, {
    onStart: () => duckFloatRef.current?.pause(),
    onEnd:   () => duckFloatRef.current?.play(),
  });
  useDraggable(lotusRef, dragRef, root);


    function handleParallax(e){
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left)/r.width - 0.5;   // -0.5..0.5
    const cy = (e.clientY - r.top)/r.height - 0.5;
    gsap.to(`.${css.lotus}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.daisy}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.iris}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
    gsap.to(`.${css.reeds}`,   { x: cx*4,  y: cy*3,  duration: .5, ease:'sine.out' });
  }

  

return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={handleParallax} >
        
        <div ref={waterRef} className={css.water} />
        <div className={css.waterTex} style={{ backgroundImage: `url(${waterTex})` }} />

        {/* НОВЕ: ширша зона для drag, її просто використовуємо як bounds */}
      <div ref={dragRef} className={css.dragArea} aria-hidden />

        {/* рослини */}
        <img className={css.reeds} src={reeds} alt="" />
        <img ref={lotusRef} className={css.lotus + ' ' + css.draggable} src={lotus} alt="Lotus" />        <img className={`${css.iris} ${css.flipX}`} src={iris}  alt="" />
        <img className={css.daisy}  src={daisy}  alt="" />
        <img className={css.flower}  src={flower}  alt="" />
        <img className={css.grassReeds}  src={grassReeds}  alt="" />
        <img className={css.grass}  src={grass}  alt="" />
        <img className={css.lotus2}  src={lotus2}  alt="" />
        <img className={css.waterGrass}  src={waterGrass}  alt="" />

        {/* дім */}
        <img className={css.house}  src={house}  alt="" />

        {/* персонажі */}
      <div className={css.mama}>
        <img className={css.mamaImg} src={duckMama} alt="Mama duck" />
        {/* хвильки на воді */}
        <span className={`${css.wake} ${css.wake1}`} aria-hidden="true" />
        <span className={`${css.wake} ${css.wake2}`} aria-hidden="true" />
      </div>
        <img ref={duckRef} className={css.duck + ' ' + css.draggable} src={duck} alt="Duck" />          <img className={css.frog} src={frog} alt="Frog" />
        <img className={css.bflyBlue} src={butterflyBlue} alt="" />
        <img className={css.bflyOrange} src={butterflyOrange} alt="" />
        <img className={css.ladybug} src={ladybug} alt="" />

        {/* текст */}
        <p className={`${css.caption} ${css.topCenter}`}>Hallo, Küken!</p>
        <div className={css.noise} />
      </div>
    </div>
  );
}
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import css from './SecondScene.module.css';


import beaver       from '../../assets/Scene2/Beaver.png';
import duck2        from '../../assets/Scene2/Duck2.png';
import reeds2       from '../../assets/Scene2/Reeds2.png';
import beaverHouse  from '../../assets/Scene2/Beaver_house.png';
import forest       from '../../assets/Scene2/Forest.png';
import birds        from '../../assets/Scene2/Birds.png';
import deck         from '../../assets/Scene2/Deck.png';
import ladybugFly   from '../../assets/Scene2/Ladybug_fly.png';
import daisy from '../../assets/Scene1/daisy.png';
import watercolor from '../../assets/Scene2/Watercolor.png';
import stone from '../../assets/Scene2/Stone.png'
import butterflyRed from '../../assets/Scene1/butterfly_red.png';
import riverstones from '../../assets/Scene2/River_stones.png';
import forest3 from '../../assets/Scene2/Forest3.png';
import boat from '../../assets/Scene2/boat.png';
import flora from '../../assets/Scene3/flora.png';
import tree from '../../assets/Scene2/Tree.png';
import road from '../../assets/Scene2/road.png';
import cereals from '../../assets/Scene2/cereals.png';
import m1 from '../../assets/Scene2/mosquito1.png';
import m2 from '../../assets/Scene2/mosquito2.png';
import m3 from '../../assets/Scene2/mosquito3.png';
import m4 from '../../assets/Scene2/mosquito4.png';
import m5 from '../../assets/Scene2/mosquito5.png';



export default function SecondScene() {
  const root = useRef(null);
  const mosqLayerRef = useRef(null);
  const imgRefs = useRef([]);
  const MOSQ = [m1, m2, m3, m4, m5];


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // стартові стани
      gsap.set(`.${css.caption}`, { y: 16, opacity: 0 });
      gsap.set([`.${css.beaver}`, `.${css.duck2}`], { opacity: 0, y: 10 });
      gsap.set([`.${css.ladybug}`, `.${css.birds}`], { opacity: 0 });

      // вхід
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(`.${css.frame}`, { scale: 1.02 }, { scale: 1, duration: 0.6 })
        .to([`.${css.beaver}`, `.${css.duck2}`], { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
        .to([`.${css.ladybug}`, `.${css.birds}`], { opacity: 1, duration: 0.25 }, '-=0.2')
        .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');

      // нескінченні петлі
      gsap.to(`.${css.beaver}`, { y: '+=4', repeat: -1, yoyo: true, duration: 2.2, ease: 'sine.inOut' });
      gsap.to(`.${css.duck2}`, { y: '+=6', repeat: -1, yoyo: true, duration: 1.8, ease: 'sine.inOut' });

      // вітер
      gsap.to(`.${css.daisy}`, {
        rotation: 2.4,
        duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8
      });
            gsap.to(`.${css.flora}`, {
        rotation: -2,
        duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8
      });

      gsap.to(`.${css.cereals}`, {
        rotation: 1.8,
        duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8
      });

      gsap.to(`.${css.reeds2}`, { 
        rotation: -2, 
        duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });


      // комахи/птахи
      gsap.to(`.${css.ladybug}`, {
        keyframes: [
          { x: 20, y: -10, rotate: 6, duration: 1.0 },
          { x: 0,  y: 0,   rotate: -4, duration: 1.0 },
          { x: -18, y: -6, rotate: 8, duration: 1.0 },
        ],
        repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    gsap.to(`.${css.butterflyRed}`, {
        keyframes: [
          { x: -40, y: -20, rotation: 0, duration: 1.1 },
          { x: 0, y: 0, rotation: 6, duration: 1.1 },
          { x: 60, y: -30, rotation: -6, duration: 1.1 }
        ],
        repeat: -1, yoyo: true
      });

      gsap.to(`.${css.birds}`, {
        x: '+=30', y: '-=6', repeat: -1, yoyo: true, duration: 6, ease: 'sine.inOut'
      });

// ---- MOSQUITO SWARM (safe: без плагінів, без RO, з home-центром) ----
const layer = mosqLayerRef.current;
const items = imgRefs.current.filter(Boolean);

if (layer && items.length) {
  // локальний random, що повертає ЧИСЛО (ніяких "()")
  const rnd = (min, max) => gsap.utils.random(min, max);

  // розміри шару; якщо раптом 0 — даємо мінімум, щоб не впасти
  const W = layer.clientWidth  || 1;
  const H = layer.clientHeight || 1;

  // радіус «хмари» навколо home
  const R  = Math.min(W, H) * 0.28;
  const Ry = R * 0.65; // по Y трохи менше, щоб пляма була еліпсом

  items.forEach((el) => {
    // фіксований центр роєння для конкретного комара
    const home = {
      x: rnd(-W * 0.10,  W * 0.10),
      y: rnd(-H * 0.06,  H * 0.06),
    };

    // старт прямо з home
    gsap.set(el, {
      x: home.x,
      y: home.y,
      rotation: rnd(-12, 12),
      scale: rnd(0.85, 1.1),
      opacity: rnd(0.75, 0.95)
    });

    // дрібне «дзижчання» — чистий yoyo, НЕ нарощує дрейф
    gsap.to(el, {
      x: `+=${rnd(-12, 12)}`,
      y: `+=${rnd(-8, 8)}`,
      rotation: `+=${rnd(-16, 16)}`,
      duration: rnd(0.45, 0.8),
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // повільне блукання: до нової точки біля home
    const wander = () => {
      const tx = home.x + rnd(-R,  R);
      const ty = home.y + rnd(-Ry, Ry);
      gsap.to(el, {
        x: tx, y: ty,
        duration: rnd(4.5, 7),
        ease: 'none',
        onComplete: wander
      });
    };
    wander();

    // періодичне «повернення додому», щоб ніколи не розповзались назовсім
    const recenter = () => {
      gsap.to(el, {
        x: home.x, y: home.y,
        duration: 0.8, ease: 'sine.inOut',
        onComplete: () => gsap.delayedCall(rnd(2, 4), wander)
      });
      gsap.delayedCall(rnd(10, 14), recenter);
    };
    gsap.delayedCall(rnd(10, 14), recenter);

    // легке мерехтіння
    gsap.to(el, {
      opacity: `+=${rnd(-0.12, -0.05)}`,
      duration: rnd(0.25, 0.45),
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  });
}
}, root);
    return () => ctx.revert();
  }, []);

  function handleParallax(e){
  const r = e.currentTarget.getBoundingClientRect();
  const cx = (e.clientX - r.left)/r.width - 0.5;   // -0.5..0.5
  const cy = (e.clientY - r.top)/r.height - 0.5;
  gsap.to(`.${css.bgForest}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
  gsap.to(`.${css.bgForest2}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
  gsap.to(`.${css.forest3}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
  gsap.to(`.${css.reeds2}`,   { x: cx*4,  y: cy*3,  duration: .5, ease:'sine.out' });
  gsap.to(`.${css.mosqLayer}`,    { x: cx*6,  y: cy*4,  duration: .5, ease:'sine.out' });

}


  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={handleParallax} >
        {/* дальній план */}
        <img className={css.bgForest} src={forest} alt="" aria-hidden="true" />
        <img className={css.bgForest2} src={forest} alt="" aria-hidden="true" />
        <img className={css.forest3} src={forest3} alt="" aria-hidden="true" />
        <img className={css.boat} src={boat} alt="" />
        <img className={css.flora} src={flora} alt="" />
        <img className={css.tree} src={tree} alt="" />
        <img className={css.birds} src={birds}  alt="" aria-hidden="true" />

        {/* пушинки */}
        <div className={css.pond}>
        <div className={css.pollen} aria-hidden="true" />

        {/* тіні на землі */}
        <div className={css.shadow} style={{ left: '18%', bottom: '13%', width: '22%' }} />
        <div className={css.shadow} style={{ right: '20%', bottom: '11%', width: '26%' }} />
        </div>

        {/* берег/будинок/очерет */}
        <img className={css.house}  src={beaverHouse} alt="" aria-hidden="true" />
        <img className={css.reeds2} src={reeds2}      alt="" aria-hidden="true" />
        <img className={`${css.deck} ${css.flipX}`}  src={deck}        alt="" aria-hidden="true" />
        <img className={css.daisy}  src={daisy}  alt="" />
        <img className={css.watercolor} src={watercolor} alt="" />
        <img className={css.stone} src={stone} alt="" />
        <div className={css.shoreFill}/>
        <img className={`${css.riverstones} ${css.flipX}`}  src={riverstones} alt="" />
        <img className={css.road} src={road} alt="" />
        <img className={css.cereals} src={cereals} alt="" />

        {/* персонажі */}
        <img className={`${css.beaver} ${css.flipX}`} src={beaver} alt="Biber" />
        <img className={css.duck2}  src={duck2}  alt="Küken" />
        <img className={css.ladybug} src={ladybugFly} alt="" aria-hidden="true" />
        <img className={css.butterflyRed} src={butterflyRed} alt="" />
        {/* комарі */}
        <div ref={mosqLayerRef} className={css.mosqLayer}>
          {MOSQ.map((src, i)=> (
          <img
          key={i}
          ref={el => (imgRefs.current[i] = el)}
          src={src}
          alt=""
          className={css.mosq}
          />
          ))}
          </div>

        
        {/* текст */}
        <p className={`${css.caption} ${css.topCenter}`}>“Hallo, Lieber Biber!”, ruft das Küken.“Heute ist so ein schöner Tag!”</p>
      </div>
    </div>
  );
}

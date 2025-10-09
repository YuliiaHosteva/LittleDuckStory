import css from './ThirdScene.module.css';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

import hedgehog from '../../assets/Scene3/hedgehog.png';
import bee from '../../assets/Scene3/bee.png';
import snail from '../../assets/Scene3/snail.png';
import wildflowers from '../../assets/Scene3/wildflowers.png';
import chrysanthemum from '../../assets/Scene3/Chrysanthemum.png';
import yellowflowers from '../../assets/Scene3/yellowflowers.png';
import dandelion from '../../assets/Scene3/dandelion.png';
import lavender from '../../assets/Scene3/Lavender.png';
import blueflowers from '../../assets/Scene3/Blueflowers.png';
import duck from '../../assets/Scene3/duck3.png';
import poppy from '../../assets/Scene3/Poppy.png';
import grass from '../../assets/Scene1/grass2.png';
import grass2 from '../../assets/Scene1/grass2.png';
import bgFlawers from '../../assets/Scene3/bgFlowers.png';
import flora from '../../assets/Scene3/flora.png';
import muchrooms from '../../assets/Scene3/muchrooms.png';
import stump from '../../assets/Scene3/stump.png';
import stone from '../../assets/Scene3/stone.png';
import stone2 from '../../assets/Scene3/stone.png';


export default function ThirdScene() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // стартові стани
      gsap.set(`.${css.caption}`, { y: 16, opacity: 0 });
      gsap.set([`.${css.duck}`, `.${css.hedgehog}`, `.${css.snail}`], { y: 12, opacity: 0 });
      gsap.set([`.${css.flowersFar}`, `.${css.flowersMid}`, `.${css.flowersNear}`], { opacity: 0, y: 10 });

      // вхід
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(`.${css.bg}`, { scale: 1.03 }, { scale: 1, duration: 0.8 })
        .to(`.${css.flowersFar}`,  { opacity: 1, y: 0, duration: 0.35 }, '-=0.5')
        .to(`.${css.flowersMid}`,  { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
        .to(`.${css.flowersNear}`, { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
        .to(`.${css.hedgehog}`,   { opacity: 1, y: 0, duration: 0.4 },  '-=0.25')
        .to(`.${css.duck}`,       { opacity: 1, y: 0, duration: 0.4 },  '-=0.3')
        .to(`.${css.snail}`,      { opacity: 1, y: 0, duration: 0.4 },  '-=0.35')
        .to(`.${css.caption}`,    { opacity: 1, y: 0, duration: 0.45 }, '-=0.1');

      // вітерець — легкий нахил квітів (різні шари по-різному)
      gsap.to(`.${css.flowersFar}`,  { rotation: 0.6, repeat:-1, yoyo:true, duration: 3.0, ease: 'sine.inOut', transformOrigin:'50% 100%', delay: .3 });
      gsap.to(`.${css.flowersMid}`,  { rotation: 1.0, repeat:-1, yoyo:true, duration: 2.6, ease: 'sine.inOut', transformOrigin:'50% 100%', delay: .3 });
      gsap.to(`.${css.flowersNear}`, { rotation: 1.4, repeat:-1, yoyo:true, duration: 2.2, ease: 'sine.inOut', transformOrigin:'50% 100%', delay: .5 });

      // каченя — м’яке підстрибування
      gsap.to(`.${css.duck}`, { y: '+=6', repeat: -1, yoyo: true, duration: 1.6, ease: 'sine.inOut' });

      // їжачок — легке “дихання”
      gsap.to(`.${css.hedgehog}`, { y: '+=3', repeat: -1, yoyo: true, duration: 2.4, ease: 'sine.inOut' });

      // равлик 
    const frameW  = root.current.getBoundingClientRect().width;
    const snailEl = document.querySelector(`.${css.snail}`);
    const snailW  = snailEl?.getBoundingClientRect().width || 80; // запасне

    gsap.fromTo(
      snailEl,
      { x: -snailW },                     // трохи за лівим краєм
      {
        x: frameW + snailW,               // трохи за правий край
        duration: 50,                     // швидкість руху
        ease: 'none',
        repeat: -1                        // нескінченно
        // y можна зафіксувати у CSS, а тут не чіпати
      }
    );
      // бджоли — кружляння по еліпсу
    const bees = gsap.utils.toArray(`.${css.bee}`);
    bees.forEach((el, i) => {
    gsap.to(el, {
    keyframes: [
      { x: -20, y: -10, duration: 0.6 },
      { x: 0,   y: 0,   duration: 0.6 },
      { x: 24,  y: -6,  duration: 0.6 },
      { x: 0,   y: 0,   duration: 0.6 }
    ],
    repeat: -1,
    ease: 'sine.inOut',
    yoyo: true,
    delay: i * 0.2
    });
    gsap.to(el, { rotation: 10, yoyo: true, repeat: -1, duration: .25, ease: 'sine.inOut' });
    });

    }, root);
    return () => ctx.revert();
  }, []);

      function handleParallax(e){
      const r = e.currentTarget.getBoundingClientRect();
      const cx = (e.clientX - r.left)/r.width - 0.5;   // -0.5..0.5
      const cy = (e.clientY - r.top)/r.height - 0.5;
      gsap.to(`.${css.blueflowers}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
      gsap.to(`.${css.yellowflowers}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
      gsap.to(`.${css.wildflowers}`, { x: cx*8,  y: cy*6,  duration: .5, ease:'sine.out' });
      gsap.to(`.${css.chrysanthemum}`, { x: cx*4,  y: cy*3,  duration: .5, ease:'sine.out' });
      gsap.to(`.${css.lavender}`, {x: cx*8, y: cy*6, duration: .5, ease:'sine.out'});
      gsap.to(`.${css.dandelion}`, {x: cx*8, y: cy*4, duration: .5, ease:'sine.out'});
      gsap.to(`.${css.poppy}`, { x: cx*2,  y: cy*1,  duration: .5, ease:'sine.out' });
      gsap.to(`.${css.duck}`, {x: cx*8, y: cy*4, duration: .5, ease:'sine.out'});
      gsap.to(`.${css.hedgehog}`, { x: cx*2,  y: cy*1,  duration: .5, ease:'sine.out' });
  
    }
  

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame} onMouseMove={handleParallax}>
        {/* фон */}
        <div className={`${css.layer} ${css.bg}`} />

        {/* далекі дерева/квіти */}
        <img className={`${css.layer} ${css.flowersFar}`} src={wildflowers} alt="" />
        <img className={`${css.layer} ${css.flowersFar} ${css.bgFlawers}`} src={bgFlawers} alt="" />
        <img className={`${css.layer} ${css.flowersFar} ${css.flora}`} src={flora} alt="" />


        {/* середній план квітів (мікс) */}
        <img className={`${css.layer} ${css.flowersMid} ${css.dandelion}`}  src={dandelion} alt="" />
        <img className={`${css.layer} ${css.flowersMid} ${css.lavender}`}     src={lavender} alt="" />
        <img className={`${css.layer} ${css.flowersMid} ${css.blueflowers}`}    src={blueflowers} alt="" />
        <img className={`${css.layer} ${css.flowersMid} ${css.yellowflowers}`} src={yellowflowers} alt="" />
        
        {/* передній план квітів */}
        <img className={`${css.layer} ${css.flowersNear} ${css.chrysanthemum}`}  src={chrysanthemum} alt="" />
        <img className={`${css.layer} ${css.flowersNear} ${css.poppy}`} src={poppy} alt="" />
        <img className={`${css.layer}  ${css.grass}`} src={grass} alt="" />
        <img className={`${css.layer}  ${css.grass2}`} src={grass2} alt="" />
        <img className={`${css.layer}  ${css.stone2}`} src={stone2} alt="" />
        <img className={`${css.layer}  ${css.stone}`} src={stone} alt="" />

        <img className={`${css.layer}  ${css.stump}`} src={stump} alt="" />
        <img className={`${css.layer}  ${css.muchrooms}`} src={muchrooms} alt="" />

        

        {/* персонажі */}
        <img className={`${css.hedgehog}`} src={hedgehog} alt="Igel" />
        <img className={`${css.duck} ${css.flipX}`}     src={duck}     alt="Küken" />
        <img className={`${css.snail}`}    src={snail}    alt="Schnecke" />

        {/* бджоли (кілька штук) */}
        <img className={`${css.bee} ${css.bee1}`} src={bee} alt="Biene" />
        <img className={`${css.bee} ${css.bee2}`} src={bee} alt="Biene" />
        <img className={`${css.bee} ${css.bee3}`} src={bee} alt="Biene" />

        {/* текст */}
        <p className={css.caption}>
          “Hallo, lieber Igel!”,
          ruft das Küken.<br/>
          “Weißt du, dass ich dich richtig mag?”
        </p>
      </div>
    </div>
  );
}

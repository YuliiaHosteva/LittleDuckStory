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

      // равлик — повільне ковзання вперед-назад
      gsap.to(`.${css.snail}`, { x: '+=14', repeat: -1, yoyo: true, duration: 6, ease: 'sine.inOut' });

      // бджоли — кружляння по еліпсу
      const bees = gsap.utils.toArray(`.${css.bee}`);
      bees.forEach((el, i) => {
        gsap.to(el, {
          motionPath: {
            path: [{x: -20, y: -10}, {x: 0, y: 0}, {x: 24, y: -6}, {x: 0, y: 0}],
            curviness: 0
          },
          repeat: -1,
          duration: 2.2 + i * 0.2,
          ease: 'sine.inOut',
          yoyo: true
        });
        gsap.to(el, { rotation: 10, yoyo: true, repeat: -1, duration: .25, ease: 'sine.inOut' });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame}>
        {/* фон */}
        <div className={`${css.layer} ${css.bg}`} />

        {/* далекі дерева/квіти */}
        <img className={`${css.layer} ${css.flowersFar}`} src={wildflowers} alt="" />

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
          “Hallo, lieber Igel!”,<br/>
          ruft das Küken.<br/>
          “Weißt du, dass ich dich richtig mag?”
        </p>
      </div>
    </div>
  );
}

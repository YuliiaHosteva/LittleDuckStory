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


export default function SecondScene() {
  const root = useRef(null);

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
      gsap.to(`.${css.reeds2}`, { rotation: -2, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // комахи/птахи
      gsap.to(`.${css.ladybug}`, {
        keyframes: [
          { x: 20, y: -10, rotate: 6, duration: 1.0 },
          { x: 0,  y: 0,   rotate: -4, duration: 1.0 },
          { x: -18, y: -6, rotate: 8, duration: 1.0 },
        ],
        repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
      gsap.to(`.${css.birds}`, {
        x: '+=30', y: '-=6', repeat: -1, yoyo: true, duration: 6, ease: 'sine.inOut'
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={css.scene}>
      <div ref={root} className={css.frame}>
        {/* дальній план */}
        <img className={css.bgForest} src={forest} alt="" aria-hidden="true" />
        <img className={css.birds}    src={birds}  alt="" aria-hidden="true" />

        {/* вода */}
        <div className={css.pond}>
        <div className={css.pondFill} />

        {/* тіні на землі */}
        <div className={css.shadow} style={{ left: '18%', bottom: '13%', width: '22%' }} />
        <div className={css.shadow} style={{ right: '20%', bottom: '11%', width: '26%' }} />
        </div>
        {/* берег/будинок/очерет */}
        <img className={css.house}  src={beaverHouse} alt="" aria-hidden="true" />
        <img className={css.reeds2} src={reeds2}      alt="" aria-hidden="true" />
        <img className={css.deck}   src={deck}        alt="" aria-hidden="true" />

        {/* персонажі */}
        <img className={`${css.beaver} ${css.flipX}`} src={beaver} alt="Biber" />
        <img className={css.duck2}  src={duck2}  alt="Küken" />
        <img className={css.ladybug} src={ladybugFly} alt="" aria-hidden="true" />

        {/* текст */}
        <p className={`${css.caption} ${css.topCenter}`}>“Hallo, Lieber Biber!”,ruft das Küken.“Heute ist so ein schöner Tag!”</p>
      </div>
    </div>
  );
}

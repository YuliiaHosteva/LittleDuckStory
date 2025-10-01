import css from './FirstScene.module.css';
import { useLayoutEffect, useRef } from 'react';
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


export default function FirstScene() {
  const root = useRef(null);

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
      tl.fromTo(`.${css.bg}`, { scale: 1.04 }, { scale: 1, duration: 1.0 })
        .to(`.${css.mama}`, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
        .to(`.${css.duck}`, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.4')
        .to(`.${css.caption}`, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to([`.${css.bflyBlue}`, `.${css.bflyOrange}`], { opacity: 1, duration: 0.2 }, '<');

      // нескінченні петлі
      gsap.to(`.${css.duck}`, { y: '+=6', repeat: -1, yoyo: true, duration: 1.8, ease: 'sine.inOut' });
      gsap.to(`.${css.mama}`, { y: '+=4', repeat: -1, yoyo: true, duration: 2.2, ease: 'sine.inOut' });
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
    gsap.to(`.${css.iris}`, {
      rotation: -2, x: -0.5,
      duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .3
    });
    gsap.to(`.${css.lotus}`, {
      rotation: 1.2,
      duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6
    });
    // (опціонально) ромашки
    gsap.to(`.${css.daisy}`, {
      rotation: 1.4,
      duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8
    });

    
    }, root);
    return () => ctx.revert();
  }, []);

return (
    <div className={css.scene}>
      <div ref={root} className={css.frame}>
        
        <div className={css.water} />
        <div className={css.waterTex} style={{ backgroundImage: `url(${waterTex})` }} />
        {/* рослини */}
        <img className={css.reeds} src={reeds} alt="" />
        <img className={css.lotus} src={lotus} alt="" />
        <img className={css.iris}  src={iris}  alt="" />
        <img className={css.daisy}  src={daisy}  alt="" />

        {/* персонажі */}
        <img className={css.mama} src={duckMama} alt="Mama duck" />
        <img className={css.duck} src={duck} alt="Duck" />
        <img className={css.frog} src={frog} alt="Frog" />
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
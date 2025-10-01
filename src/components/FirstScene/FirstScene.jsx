import css from"./FirstScene.module.css";
import duckImg from "../../assets/img/duck.svg";
import { useEffect } from 'react';


const FirstScene = () => {

   // Використовуємо useEffect, щоб примусово викликати рендер
   useEffect(() => {
  }, []);  // Хук реагує на зміни пропсу update
  
  
  return (
    <div className={css.firstScene}>
      <div className={css.background}>
        <div className={css.cloudCloud1}></div>
        <div className={css.cloudCloud2}></div>
        <div className={css.lake}></div>
      </div>
      <div className={css.duck}>
        <img src={duckImg} alt="Duck" />
      </div>
      <div className={css.text}>
        Одного ранку маленьке каченя прокинулося біля озера та вирішило прогулятися.
      </div>
    </div>
  );
};


export default FirstScene;

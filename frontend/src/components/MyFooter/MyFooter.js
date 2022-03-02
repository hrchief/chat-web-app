import * as React from 'react';
import * as styles from './footer.module.scss';

const MyFooter = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <p className={styles.content__container__text}>
          5 ~ 6 September 2021 By Paulo. Hello
        </p>
        <ul className={styles.content__container__list}>
          <li className={styles.content__container__list__item}>world!</li>
          <li className={styles.content__container__list__item}>bob!</li>
          <li className={styles.content__container__list__item}>users!</li>
          <li className={styles.content__container__list__item}>everybody!</li>
        </ul>
      </div>
    </div>
  );
};

export default MyFooter;

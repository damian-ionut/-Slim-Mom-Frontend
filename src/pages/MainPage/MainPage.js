import banana from './images/banana.png';
import strawberry from './images/strawberry.png';
import mainVector from './images/main-vector.svg';
import styles from './MainPage.module.scss';
import DailyCaloriesForm from '../../components/DailyCaloriesForm';

function MainPage() {
  return (
    <div className={styles['main']}>
      <div className={styles['main__content']}>
        <h1 className={styles['main__title']}>
          Calculate your daily calorie intake right now
        </h1>
        <DailyCaloriesForm />
      </div>

      <div className={styles['main__img--wrapper']}>
        <div id={styles['banana']}>
          <img src={banana} className={styles['banana']} alt="banana" />
        </div>
        <img
          src={strawberry}
          className={styles['strawberry']}
          alt="strawberry"
        />
        <img
          src={mainVector}
          className={styles['mainVector']}
          alt="background-vector"
        />
      </div>
    </div>
  );
}

export default MainPage;

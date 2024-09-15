import { useState, useEffect } from 'react';
import styles from './RightSideBar.module.scss';
import { getCurrentUser, getDiaryByDate } from '../../js/backendAPI';
import { toBackendDateString } from '../../js/utils';

export default function RightSideBar({
  userParams,
  userProducts,
  date,
  diaryProducts,
}) {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (userParams && userProducts) {
        setUserData({
          parameters: userParams,
          notAllowedProducts: userProducts,
        });
        return;
      }
      const currentUser = await getCurrentUser();
      setUserData(currentUser);
    }
    fetchUserData();
  }, [userParams, userProducts]);

  useEffect(() => {
    async function fetchDiary() {
      if (diaryProducts) {
        setProducts(diaryProducts);
      } else if (date) {
        const data = await getDiaryByDate(date);
        setProducts(data);
      }
    }
    fetchDiary();
  }, [date, diaryProducts]);

  const dailyRate = () => {
    return userData?.parameters?.calories || 0;
  };

  const totalCaloriesOfDay = () => {
    if (products) {
      return products
        .map(product => product.calories || 0)
        .reduce((previousValue, number) => previousValue + number, 0);
    }
    return 0;
  };

  const dailyNorm = dailyRate();
  const consumed = totalCaloriesOfDay();
  const percentOfNormal = dailyNorm ? (consumed / dailyNorm) * 100 : 0;
  const left = dailyNorm - consumed;

  return (
    <div className={styles.container}>
      <div className={styles.summery}>
        <h1 className={styles.header}>
          Report for <span>{toBackendDateString(date)}</span>
        </h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.text}>Left</p>
            <span className={styles.text}>
              {dailyNorm ? `${left.toFixed(0)} kcal` : '0 kcal'}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Consumed</p>
            <span className={styles.text}>
              {dailyNorm ? `${consumed.toFixed(0)} kcal` : '0 kcal'}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Daily Norm</p>
            <span className={styles.text}>
              {dailyNorm ? `${dailyNorm} kcal` : '0 kcal'}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.last__text}>% of the Norm</p>
            <span className={styles.text}>
              {dailyNorm ? `${percentOfNormal.toFixed(0)} %` : '0 %'}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.norecommended}>
        <h2 className={styles.header}>Not Recommended Foods</h2>
        <ul>
          {userData?.notAllowedProducts?.length ? (
            userData.notAllowedProducts.slice(0, 9).map(({ _id, title }) => (
              <li key={_id} className={styles.text_item}>
                <span>{title.en}</span>
              </li>
            ))
          ) : (
            <p className={styles.text}>Your diet will be displayed here</p>
          )}
        </ul>
      </div>
    </div>
  );
}

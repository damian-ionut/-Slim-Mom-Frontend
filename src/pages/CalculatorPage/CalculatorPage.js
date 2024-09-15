import { Fragment, useState, useEffect } from 'react';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import styles from './CalculatorPage.module.scss';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import { getCurrentUser, updateCurrentUser } from '../../js/backendAPI';
import { useMediaQuery } from '../../js/hooks';

const CalculatorPage = () => {
  const [date] = useState(new Date());
  const [userParams, setUserParams] = useState(null);
  const [userProducts, setUserProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getUserFromBd() {
      try {
        const response = await getCurrentUser();
        const { height, age, currentWeight, desiredWeight } = response.parameters;
        if (
          height !== '0' &&
          age !== '0' &&
          currentWeight !== '0' &&
          desiredWeight !== '0'
        ) {
          setUserParams(response.parameters);
        }
        setUserProducts(response.notAllowedProducts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setIsFetching(false);
    }
    getUserFromBd();
  }, []);

  const desktopSize = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-desktop');
  const toDesktopSize = parseInt(desktopSize) - 1 + 'px';
  const isNotDesktop = useMediaQuery(`(max-width: ${toDesktopSize})`);

  const updateUser = async values => {
    try {
      const response = await updateCurrentUser(values);
      console.log("User updated with response:", response); 
      setUserParams(response.parameters);
      setUserProducts(response.notAllowedProducts);
      if (isNotDesktop) {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Fragment>
      {isFetching ? (
        <Loader />
      ) : (
        <Container>
          <div className={styles.container_calculator}>
            <h1 className={styles.container__title}>
              Calculate your daily calorie intake right now
            </h1>
            <DailyCaloriesForm onFormSubmit={updateUser} {...userParams} />
          </div>
          <RightSideBar
            date={date}
            userParams={userParams}
            userProducts={userProducts}
          />
        </Container>
      )}
    </Fragment>
  );
};

export default CalculatorPage;

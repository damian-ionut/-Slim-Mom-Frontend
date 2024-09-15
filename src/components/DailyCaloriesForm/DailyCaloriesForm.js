import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/index';
import styles from './DailyCaloriesForm.module.scss';
import DailyCalorieIntake from '../DailyCalorieIntake';
import { getPublicData } from '../../js/backendAPI';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

const schema = yup.object().shape({
  height: yup
    .number('The value must be a number')
    .typeError('Please enter a numeric value')
    .min(100, 'Please specify a value greater than 100')
    .max(250, 'Please specify a value less than 250')
    .integer('The value must be an integer')
    .required('This field is required'),
  age: yup
    .number('The value must be a number')
    .typeError('Please enter a numeric value')
    .min(18, 'Please specify a value greater than 18')
    .max(100, 'Please specify a value less than 100')
    .integer('The value must be an integer')
    .required('This field is required'),
  currentWeight: yup
    .number('The value must be a number')
    .typeError('Please enter a numeric value')
    .min(20, 'Please specify a value greater than 20')
    .max(500, 'Please specify a value less than 500')
    .integer('The value must be an integer')
    .required('This field is required'),
  desiredWeight: yup
    .number('The value must be a number')
    .typeError('Please enter a numeric value')
    .min(20, 'Please specify a value greater than 20')
    .max(500, 'Please specify a value less than 500')
    .integer('The value must be an integer')
    .required('This field is required'),
});

function DailyCaloriesForm({
  onFormSubmit = () => {},
  height = '',
  age = '',
  currentWeight = '',
  desiredWeight = '',
  bloodType = '1',
}) {
  const [list, setList] = useState([]);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const submitForm = async (values, { resetForm }) => {
    console.log("Submitting form with values:", values);
    if (!isLoggedIn) {
      try {
        const data = await getPublicData(values);
        console.log("Data received from API:", data);
        setList(data);
      } catch (error) {
        console.error("Error fetching public data:", error);
      }
    }
    await onFormSubmit(values);
    resetForm();
  };

  return (
    <div className={styles.container}>
      {list.length > 0 && (
        <div className={styles.result}>
          <DailyCalorieIntake foodsList={list} />
        </div>
      )}
      <Formik
        initialValues={{
          height,
          age,
          currentWeight,
          desiredWeight,
          bloodType,
        }}
        validationSchema={schema}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={submitForm}
        enableReinitialize
      >
        {formik => {
          const { values, handleSubmit, errors, touched, isValid, dirty } = formik;
          return (
            <Form className={styles['calculate__form']} onSubmit={handleSubmit}>
              <div className={styles['field__wrapper']}>
                <Field
                  type="number"
                  name="height"
                  placeholder="Height *"
                  className={
                    errors.height && touched.height
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="number"
                  name="age"
                  placeholder="Age *"
                  className={
                    errors.age && touched.age
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="number"
                  name="currentWeight"
                  placeholder="Weight *"
                  className={
                    errors.currentWeight && touched.currentWeight
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="currentWeight"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="number"
                  name="desiredWeight"
                  placeholder="Desired weight *"
                  className={
                    errors.desiredWeight && touched.desiredWeight
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="desiredWeight"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>

              <div className={styles['radio__wrapper']}>
                <div id={styles['blood-group']}>Blood type *</div>
                <div
                  role="group"
                  aria-labelledby="blood-group"
                  className={styles['radio']}
                >
                  <label>
                    I
                    <Field
                      type="radio"
                      name="bloodType"
                      value="1"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    II
                    <Field
                      type="radio"
                      name="bloodType"
                      value="2"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    III
                    <Field
                      type="radio"
                      name="bloodType"
                      value="3"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    IV
                    <Field
                      type="radio"
                      name="bloodType"
                      value="4"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                </div>
              </div>

              <Button
                id={'button-form'}
                type="submit"
                disabled={!(dirty && isValid && values.bloodType)}
                className={
                  !(dirty && isValid && values.bloodType) ? 'disabled-btn' : ''
                }
                title={'Start losing weight'}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default DailyCaloriesForm;

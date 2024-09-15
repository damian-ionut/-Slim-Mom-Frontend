import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import styles from './RegisterPage.module.scss';
import s from '../../pages/MainPage/MainPage.module.scss';

import banana from "../../pages/MainPage/images/banana.png";
import strawberry from "../../pages/MainPage/images/strawberry.png";
import mainVector from "../../pages/MainPage/images/main-vector.svg";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').max(16, 'Name must be no more than 16 characters').required("Required field"),
  email: yup.string().min(7, 'Email must be at least 7 characters').max(254, 'Email must be no more than 254 characters').required("Required field").email('Email must be valid'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required("Required field").max(55, 'Password must be no more than 55 characters'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
}

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [, setName] = useState('');
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');

  const handleSubmit = ({ name, email, password }, { resetForm }) => {  
    setName(name);
    setEmail(email);
    setPassword(password);  
    dispatch(authOperations.register({ name, email, password }));
    resetForm({ name: "", email: "", password: "" });
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.title__container}>
          <h1 className={styles.title}>Registration</h1>
        </div>      
        
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              Name*
              <Field className={styles.input}
                type="text"
                name="name"            
                autoComplete="off"
                required
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              Email*
              <Field className={styles.input}
                type="email"
                name="email"            
                autoComplete="off"
                required
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              Password*
              <Field className={styles.input}
                type="password"
                name="password"            
                autoComplete="off"
                required
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </label>

            <ul className={styles.list}>
              <li className={styles.item}>
                <a href='./login'>
                  <button type="button" className={styles.btn__second}>Login</button>
                </a>
              </li>
              <li className={styles.item}>
              <a href='./diary'>
                <button type="submit" className={styles.btn}>Register</button>
                </a>
              </li>           
            </ul>       
          </Form>
        </Formik>
      </div>

      <div className={s['main__img--wrapper']}>
        <div id={s['banana']}>
          <img src={banana} className={s['banana']} alt="banana" />
        </div>
        <img
          src={strawberry}
          className={s['strawberry']}
          alt="strawberry"
        />
        <img
          src={mainVector}
          className={s['mainVector']}
          alt="background-vector"
        />
      </div>
    </div>
  );
}

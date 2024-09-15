import React, { useState, useEffect, useCallback } from 'react';
import s from './ProductForm.module.scss';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import productsData from '../products.json';
import { addProductInDiary } from '../../js/backendAPI';

function ProductForm({ onSubmit, date }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const updateQuery = useCallback(() => {
    if (name) {
      const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(name.toLowerCase())
      );
      setList(filteredProducts);
    } else {
      setList([]);
    }
  }, [name]);

  useEffect(() => {
    const debouncedQuery = debounce(updateQuery, 500);
    debouncedQuery();
    return () => debouncedQuery.cancel();
  }, [updateQuery]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const onHandleSubmit = async () => {
    try {
      console.log('Submitting product:', { title: name, weight: number, date });
      const product = productsData.find(p => p.title === name);
      const calories = product ? product.calories : 0;
      const productData = {
        title: name,
        weight: number,
        date,
        calories: (calories * number) / 100, 
      };
      console.log('Product data to be sent:', productData);
      await addProductInDiary(productData);
      onSubmit();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={s.block}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className={s.form}>
        <label className={s.name}>
          <input
            {...register('name', { required: 'Enter more than 2 characters' })}
            type="text"
            name="name"
            className={s.inputName}
            value={name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            list="list"
          />
          {errors.name && <span className={s.messageName}>{errors.name.message}</span>}
        </label>
        {Array.isArray(list) && list.length > 0 && (
          <datalist id="list">
            {list.map(({ _id, title }) => (
              <option key={_id} value={title} />
            ))}
          </datalist>
        )}
        <label className={s.gram}>
          <input
            {...register('number', { required: true, min: 1 })}
            type="number"
            name="number"
            className={s.inputGram}
            value={number}
            onChange={handleInputChange}
            placeholder="Grams"
          />
          <span className={s.messageNumber}>
            {errors.number?.type === "required" && 'Enter data'}
            {errors.number?.type === "min" && "Invalid value"}
          </span>
        </label>
        <button type='submit' className={s.button}>
          <p className={s.add}>Add</p>
          <span className={s.plus}>+</span>
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

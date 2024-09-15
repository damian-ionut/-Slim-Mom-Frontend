import React from 'react';
import styles from './DiaryProductList.module.scss'; 

export default function DiaryProductList({ products, onDeleteItem }) {
  return (
    <div className={styles.block}>
      <h3>Added Products:</h3>
      <ul className={styles.list}>
        {products.map(product => (
          <li key={product._id}>
            {product.title} - {product.weight}g - {product.calories} kcal
            <button
              className={styles.button}
              onClick={() => onDeleteItem(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

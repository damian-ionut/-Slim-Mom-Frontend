import { useState } from 'react';
import productsData from '../../components/products.json'; 
import styles from './DiaryProduct.module.scss';

export default function DiaryProduct({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (value.length > 1) {
      const filteredSuggestions = productsData.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!productName || !grams) {
      alert('Please enter both product name and grams.');
      return;
    }

    const product = productsData.find(p => p.title.toLowerCase() === productName.toLowerCase());

    if (!product) {
      alert('Product not found.');
      return;
    }

    const totalCalories = (product.calories * (grams / 100)).toFixed(2);

    const newProduct = {
      _id: `${Date.now()}`,
      title: product.title,
      weight: parseFloat(grams),
      calories: parseFloat(totalCalories),
    };

    onSubmit(newProduct.title, newProduct.weight);

    setProductName('');
    setGrams('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (productTitle) => {
    setProductName(productTitle);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.block}>
      <label>
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Type food or drink"
          className={styles.input}
        />
      </label>
      <label>
        <input
          type="number"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder="Enter grams"
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.buttonPlus}>
        <span className={styles.plus}>+</span>
      </button>
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSuggestionClick(product.title)}
              className={styles.suggestionItem}
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

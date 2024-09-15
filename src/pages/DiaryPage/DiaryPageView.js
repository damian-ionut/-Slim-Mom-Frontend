import Container from '../../components/Container';
import DiaryDateСalendar from '../../components/DiaryDateCalendar/DiaryDateСalendar';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';
import { useState, useEffect } from 'react';
import DiaryProduct from '../../components/DiaryProduct';
import DiaryProductList from '../../components/DiaryProductList';
import { getDiaryByDate, deleteProductById, addProductInDiary } from '../../js/backendAPI';
import productsData from '../../components/products.json';
import styles from './DiaryPageView.module.scss'; 

export default function DiaryPageView() {
  const [date, setDate] = useState(new Date());
  const [diaryProducts, setDiaryProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getDiaryByDate(date);
        setDiaryProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching diary products:', error);
      }
    };
    fetchProducts();
  }, [date]);

  const deleteProduct = async (id) => {
    try {
      const response = await deleteProductById(id, date);
      if (response.code === 200) {
        const updatedProducts = diaryProducts.filter(product => product._id !== id);
        setDiaryProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (productName, grams) => {
    const product = productsData.find(p => p.title.toLowerCase() === productName.toLowerCase());

    if (!product) {
      console.error('Product not found in products.json');
      return;
    }

    const totalCalories = (product.calories * (grams / 100)).toFixed(2);

    const newProduct = {
      _id: `${Date.now()}`,
      title: product.title,
      weight: grams,
      calories: parseFloat(totalCalories),
    };

    try {
      await addProductInDiary({ ...newProduct, date });
      const updatedProducts = [...diaryProducts, newProduct];
      setDiaryProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container date={date}>
      <LeftSideBar>
        <DiaryDateСalendar onChangeDate={setDate} date={date} />
        <DiaryProduct onSubmit={handleAddProduct} date={date} />
        <DiaryProductList
          products={diaryProducts}
          onDeleteItem={deleteProduct}
        />
        <div className={styles.tableContainer}>
          <h2>Products from JSON</h2>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Weight</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map(product => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.weight}</td>
                  <td>{product.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LeftSideBar>
      <RightSideBar date={date} diaryProducts={diaryProducts} />
    </Container>
  );
}

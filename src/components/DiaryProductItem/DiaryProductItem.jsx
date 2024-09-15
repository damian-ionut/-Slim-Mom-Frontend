import PropTypes from 'prop-types';
import s from './DiaryProductItem.module.scss';

function DiaryProductItem({ title, weight, calories, id, date, onDeleteItem }) {
  const handleDelete = () => {
    onDeleteItem(id, date);
  };

  return (
    <li className={s.item}>
      <p className={s.text}>{title}</p>
      <p className={s.text}>
        {weight}
        <span className={s.size}>г</span>
      </p>
      <p className={s.text}>
        {calories}
        <span className={s.size}>kcal</span>
      </p>
      <button type="button" className={s.button} onClick={handleDelete}>
        &#10006;
      </button>
    </li>
  );
}

DiaryProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  weight: PropTypes.number,
  calories: PropTypes.number,
  id: PropTypes.string.isRequired,
  date: PropTypes.string,
  onDeleteItem: PropTypes.func.isRequired,
};

export default DiaryProductItem;

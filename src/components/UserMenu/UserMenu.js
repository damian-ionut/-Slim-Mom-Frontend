import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import styles from './UserMenu.module.scss';
import { useNavigate } from 'react-router-dom';

export default function UserMenu({ ...DOMprops }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(authSelectors.getUsername);

  const onLogout = async () => {
    try {
      await dispatch(authOperations.logOut()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>

      <button
        className={styles.button}
        type="button"
        onClick={onLogout}
        {...DOMprops}
      >
        Log out
      </button>
    </div>
  );
}

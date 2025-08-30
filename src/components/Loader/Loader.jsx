import { RiseLoader } from 'react-spinners';
import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <RiseLoader
        color={'#efcc42'}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ;
    </div>
  );
}

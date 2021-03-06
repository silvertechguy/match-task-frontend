import SearchRounded from '@material-ui/icons/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input
        className={styles.input}
        placeholder="Filter by Team Name or League"
        {...rest}
      />
    </div>
  );
};

export default SearchInput;

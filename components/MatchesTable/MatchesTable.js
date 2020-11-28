import Link from 'next/link';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { IconButton, Switch } from '@material-ui/core';
import { useState } from 'react';
import styles from './MatchesTable.module.css';
import { API_URL } from '../../constants/API';

const orderBy = (matches, value, direction) => {
  if (direction === 'asc') {
    return [...matches].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === 'desc') {
    return [...matches].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return matches;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const MatchesTable = ({ matches, deleteMatch }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const handleChange = event => {
    const matchId = event.target.value;

    fetch(`${API_URL}/${matchId}`, {
      method: 'PUT',
      body: {},
    });
  };

  const handleDelete = matchId => {
    deleteMatch(matchId);
  };

  const orderedMatches = orderBy(matches, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = value => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_name}>
          <div>Match</div>
        </div>

        <div className={styles.heading_score}>
          <div>Score</div>
        </div>

        <button
          className={styles.heading_date}
          onClick={() => setValueAndDirection('date')}
        >
          <div>Date</div>

          {value === 'date' && <SortArrow direction={direction} />}
        </button>

        <div className={styles.heading_active}>
          <div>Active</div>
        </div>
      </div>

      {orderedMatches.map(match => (
        <div key={match._id}>
          <div className={styles.row}>
            <Link href={`/match/${match._id}`}>
              <div
                className={styles.name}
              >{`${match.teamAName} - ${match.teamBName}`}</div>
            </Link>

            <div
              className={styles.score}
            >{`${match.teamAScore} - ${match.teamBScore}`}</div>

            <div className={styles.date}>{match.date.substring(0, 10)}</div>

            <div className={styles.active}>
              <Switch
                defaultChecked={match.active ? true : false}
                onChange={handleChange}
                color="primary"
                name="check"
                value={match._id}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(match._id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesTable;

import { useState } from 'react';
import MatchesTable from '../components/MatchesTable/MatchesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';
import AddMatch from '../components/add-match/add-match';
import { API_URL } from '../constants/API';

export default function Home(props) {
  const [matches, setMatches] = useState(props.matches);

  const [keyword, setKeyword] = useState('');
  const filteredMatches = matches.filter(
    match =>
      match.teamAName.toLowerCase().includes(keyword) ||
      match.teamBName.toLowerCase().includes(keyword) ||
      match.teamAHome.toLowerCase().includes(keyword) ||
      match.teamBHome.toLowerCase().includes(keyword) ||
      match.leauge.toLowerCase().includes(keyword)
  );

  const onInputChange = e => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  const addNewMatch = match => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    })
      .then(res => res.json())
      .then(matchData => {
        setMatches(pre => [...pre, matchData]);
      });
  };

  const deleteMatch = matchId => {
    const filteredMatches = matches.filter(match => match._id !== matchId);
    setMatches(filteredMatches);
    fetch(`${API_URL}/${matchId}`, {
      method: 'DELETE',
    });
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          Found {filteredMatches.length} matches
        </div>

        <div className={styles.input}>
          <SearchInput onChange={onInputChange} />
        </div>

        <div className={styles.add_match}>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(pre => ({ ...pre, open: true }))}
          >
            Add Match
          </Button> */}
          <AddMatch addNewMatch={addNewMatch} />
        </div>
      </div>
      <MatchesTable matches={filteredMatches} deleteMatch={deleteMatch} />
    </Layout>
  );
}

// Get all the data at build time so later on when we visit the page all the data will be available for us we don't to wait for any call to be resolve
// Remember: This is static it means that it will only be updated when we build the project
export const getStaticProps = async () => {
  const res = await fetch(API_URL);
  const { matches } = await res.json();

  return {
    props: {
      matches,
    },
  };
};

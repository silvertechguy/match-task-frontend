import Layout from '../../components/Layout/Layout';
import styles from './Match.module.css';
import { API_URL } from '../../constants/API';

const Match = ({ match }) => {
  return (
    <Layout title={match.name}>
      <div className={styles.container}>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>{match.teamAName}</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Home</div>
              <div className={styles.details_panel_value}>
                {match.teamAHome}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Away</div>
              <div className={styles.details_panel_value}>
                {match.teamAAway}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Home Score</div>
              <div className={styles.details_panel_value}>
                {match.teamAScore}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Away Score</div>
              <div className={styles.details_panel_value}>
                {match.teamBScore}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>{match.teamBName}</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Home</div>
              <div className={styles.details_panel_value}>
                {match.teamBHome}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Away</div>
              <div className={styles.details_panel_value}>
                {match.teamBAway}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Home Score</div>
              <div className={styles.details_panel_value}>
                {match.teamBScore}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Away Score</div>
              <div className={styles.details_panel_value}>
                {match.teamAScore}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container_very_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>{'Info'}</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Score</div>
              <div className={styles.details_panel_value}>
                {`${match.teamAScore} - ${match.teamBScore}`}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Date</div>
              <div className={styles.details_panel_value}>
                {match.date.substring(0, 10)}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Leauge</div>
              <div className={styles.details_panel_value}>{match.leauge}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Active</div>
              <div className={styles.details_panel_value}>
                {match.active ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Match;

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${API_URL}/${params.id}`);
  const match = await res.json();

  return {
    props: {
      match,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(API_URL);
  const { matches } = await res.json();

  const paths = matches.map(match => ({
    params: { id: match._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

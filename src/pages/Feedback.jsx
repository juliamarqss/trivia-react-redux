import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/style.css';

class Feedback extends React.Component {
  componentDidMount() {
    const { assertions, score, username, email } = this.props;
    const playerOBJ = { assertions, score, username, email }; // https://medium.com/@lameckanao/armazenando-e-manipulando-dados-no-localstorage-7bcc901ba12b#:~:text=Como%20queremos%20salvar%20v%C3%A1rios%20objetos,objeto%20ao%20final%20do%20array.
    if (localStorage.getItem('player') === null) {
      localStorage.setItem('player', JSON.stringify([playerOBJ]));
    } else {
      localStorage.setItem(
        'player',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('player')),
          playerOBJ,
        ]),
      );
    }
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    const conditionLength = assertions >= three;

    return (
      <div className="container-global-feedback">
        <Header />
        <div className="container-feed">
          { conditionLength ? <p data-testid="feedback-text" className="text-feedback">Well Done!</p>
            : <p data-testid="feedback-text" className="text-feedback">Could be better...</p>}
          <p
            data-testid="feedback-total-score"
            className="final-results"
          >
            Final Score:
            { score }
          </p>
          <p
            data-testid="feedback-total-question"
            className="final-results"
          >
            Right Answers:
            { assertions }
          </p>
          <div className="btn-feed">
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
                className="btn-play-again"
              >
                Play again
              </button>
            </Link>

            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
                className="btn-ranking"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
// so para ter o commit
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  username: state.login.username,
  email: state.login.email,
});

export default connect(mapStateToProps)(Feedback);
// export default Feedback;

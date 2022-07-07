import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

class Ranking extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const getPlayer = localStorage.getItem('player');
    const player = JSON.parse(getPlayer);
    player.sort((a, b) => b.score - a.score);
    console.log(player);
    this.setState({ players: player });
  }

  render() {
    const { players } = this.state;
    return (
      <div className="container-global-ranking">
        <div className="container-ranking">
          <h1 data-testid="ranking-title" className="title-ranking">
            Ranking
          </h1>
          <div className="score-ranking">
            {players.length > 0
                      && players.map((info, i) => (
                        <div key={ i } className="container-text-ranking">
                          <div className="text-ranking">
                            <p key={ i } data-testid={ `player-name-${i}` }>
                              {info.username}
                            </p>
                            <p key={ i } data-testid={ `player-score-${i}` }>
                              SCORE:
                              {info.score}
                            </p>
                          </div>
                        </div>
                      ))}
          </div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-go-home"
            >
              Home
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Ranking;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  transformHash = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    // console.log(hash);
    const link = `https://www.gravatar.com/avatar/${hash}`;
    return link;
  }

  render() {
    const { username, score } = this.props;
    return (
      <div className="header">
        <div className="header-left">
          <img
            src={ this.transformHash() }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ username }</p>
        </div>
        <p data-testid="header-score">
          SCORE:
          { score }
        </p>
        {/* <p>{ assertions }</p> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.login.username,
  score: state.player.score,
  email: state.login.email,
  // assertions: state.player.assertions,
});

Header.propTypes = {
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  // assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
// export default Header;

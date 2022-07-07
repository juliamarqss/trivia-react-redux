import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser, fetchToken } from '../redux/actions/index';
import '../css/style.css';
import logotrivia from '../images/logotrivia.png';
import Footer from '../components/Footer';
// import getUser from '../redux/reducer/login';

class Login extends React.Component {
  state = {
    userName: '',
    email: '',
    isDisabled: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    }, () => this.disableButton());
  };

  disableButton = () => {
    const { userName, email } = this.state;
    if (userName.length > 0 && email.length > 0) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleClick = async () => {
    const { email, userName } = this.state;
    const { setUser, history } = this.props;
    setUser(userName, email);

    const token = await fetchToken();
    // console.log('AQUI', token);
    localStorage.setItem('token', (token.token));

    history.push('game');
  };

  render() {
    const { userName, email, isDisabled } = this.state;
    return (
      <div className="container-global-login">
        <img className="logo" src={ logotrivia } alt="logo" />
        <main className="main">
          <h1>LOGIN</h1>
          <label htmlFor="userName">
            USERNAME
            <input
              type="text"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            E-MAIL
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <div className="buttons">
            <button
              className="button-play"
              type="button"
              disabled={ isDisabled }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              PLAY
            </button>
            <Link to="/settings">
              <button
                className="button-settings"
                type="button"
                data-testid="btn-settings"
              >
                SETTINGS
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user, email) => dispatch(addUser(email, user)),
});

export default connect(null, mapDispatchToProps)(Login);
// export default Login;

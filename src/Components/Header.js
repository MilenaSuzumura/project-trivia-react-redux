import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { nome, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt={ nome }
        />
        <h2 data-testid="header-player-name">{ nome }</h2>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}
const mapStateToProps = (store) => ({
  nome: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});
Header.propTypes = {
  user: PropTypes.func,
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Header);

import React from 'react';
import Footer from '../components/Footer';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <Footer />
      </div>
    );
  }
}

// export default connect()(Game);
export default Settings;

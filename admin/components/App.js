import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navbar">
          
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;

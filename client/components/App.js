import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="containter">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">NILGE</Link>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to="/">HOME</Link></li>
                  <li><Link to="/about">ABOUT</Link></li>
                  <li><Link to="/post">POST</Link></li>
                  <li><Link to="/conect">CONTACT</Link></li>
                </ul>
              </div>
            </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
export default App;

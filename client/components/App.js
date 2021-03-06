import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidUpdate() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("body-wrapper").style.marginRight = "0";
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("body-wrapper").style.marginRight = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("body-wrapper").style.marginRight = "0";
  }

  render() {
    return (
      <div>
        <div className="nav">
            <button className="btn menu-button" onClick={this.openNav}><i className="fa fa-bars" aria-hidden="true"></i> Menu</button>
            <div id="mySidenav" className="sidenav">
              <div className="fix-width">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/search">Search</Link>
              </div>
            </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;

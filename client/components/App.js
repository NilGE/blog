import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("body-wrapper").style.marginRight = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,.4)";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("body-wrapper").style.marginRight = "0";
    document.body.style.backgroundColor = "white";
  }

  render() {
    return (
      <div>
        <div className="nav">
            <button className="btn menu-button" onClick={this.openNav}><i className="fa fa-bars" aria-hidden="true"></i> Menu</button>
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/markdownEditor">New Post</Link>
                <Link to="/search">Search</Link>
            </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;

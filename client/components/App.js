import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-toggleable-md navbar-light" id="mainNav">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <i className="fa fa-bars"></i>
                </button>
                <Link className="navbar-brand page-scroll" to="/">Start Bootstrap</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/markdownEditor">New Post</Link>
                        </li>
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

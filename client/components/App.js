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
                <Link className="navbar-brand page-scroll" href="index.html">Start Bootstrap</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link page-scroll" to="/posts">Sample Post</Link>
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

        <header className="intro-header" style={{backgroundImage: 'url(img/home-bg.jpg)'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        <div className="site-heading">
                            <h1>Clean Blog</h1>
                            <span className="subheading">A Blog Theme by Start Bootstrap</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {this.props.children}
      </div>
    );
  }
}
export default App;

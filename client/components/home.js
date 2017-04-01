import React from 'react';
import {Link} from 'react-router';
import ImageHeader from './common/imageHeader';

const Home = () => {
  return (
    <div>
      <ImageHeader
        imagePath={"img/home-bg.jpg"}
        type={"site-heading"}
        heading={"Clean Blog"}
        subheading={"A Blog Theme by Start Bootstrap"}
      />
      <div className="container">
          <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="post-preview">
                      <Link to="/article">
                          <h2 className="post-title">
                              Man must explore, and this is exploration at its greatest
                          </h2>
                          <h3 className="post-subtitle">
                              Problems look mighty small from 150 miles up
                          </h3>
                      </Link>
                      <p className="post-meta">Posted by <Link to="/">Start Bootstrap</Link> on September 24, 2017</p>
                  </div>
                  <hr />
                  <div className="post-preview">
                      <Link to="/sample">
                          <h2 className="post-title">
                              I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.
                          </h2>
                      </Link>
                      <p className="post-meta">Posted by <Link to="/">Start Bootstrap</Link> on September 18, 2017</p>
                  </div>
                  <hr />
                  <div className="post-preview">
                      <Link to="/sample">
                          <h2 className="post-title">
                              Science has not yet mastered prophecy
                          </h2>
                          <h3 className="post-subtitle">
                              We predict too much for the next year and yet far too little for the next ten.
                          </h3>
                      </Link>
                      <p className="post-meta">Posted by <Link to="/">Start Bootstrap</Link> on August 24, 2017</p>
                  </div>
                  <hr />
                  <div className="post-preview">
                      <Link to="/sample">
                          <h2 className="post-title">
                              Failure is not an option
                          </h2>
                          <h3 className="post-subtitle">
                              Many say exploration is part of our destiny, but it’s actually our duty to future generations.
                          </h3>
                      </Link>
                      <p className="post-meta">Posted by <Link to="/">Start Bootstrap</Link> on July 8, 2017</p>
                  </div>
                  <hr />
                  <div className="clearfix">
                      <Link className="btn btn-secondary float-right" to="/">Older Posts &rarr;</Link>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;

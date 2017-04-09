import React from 'react';
import ImageHeader from '../common/imageHeader';

const About = () => {
  const imageStyle = {
    backgroundImage: 'url(img/about-bg.jpg)'
  };
  return (
    <div>
      <ImageHeader
        imageStyle={imageStyle}
        type={"site-heading"}
        heading={"Clean Blog"}
        subheading={"A Blog Theme by Start Bootstrap"}
      />
      <div className="container">
          <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestiae debitis nobis, quod sapiente qui voluptatum, placeat magni repudiandae accusantium fugit quas labore non rerum possimus, corrupti enim modi! Et.</p>
              </div>
          </div>
      </div>
    </div>

  );
};

export default About;

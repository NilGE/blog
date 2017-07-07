import React from 'react';
import ImageHeader from '../common/imageHeader';

const About = () => {
  const imageStyle = {
    backgroundImage: 'url(img/avatar.jpg)'
  };
  return (
    <div id="body-wrapper">
      <ImageHeader
        imageStyle={imageStyle}
        type={"header parallax full-screen"}
        heading={"About"}
        subheading={"Neil Ge"}
      />
      <main id="about-content">
        <article className="post post-article">
          <div className="post-content">
            <p>I am an enthusiastic Computer Science Student with emphasis on
              full-stack development. I have Front-end experience and worked
              with Sass, Gulp, Bootstrap and JQuery. I also have Back-end
              experience on Java and PHP. In addition, I have hands on
              experience on Data infrastructure and using Machine Learning
              models to build recommendation systems.</p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default About;

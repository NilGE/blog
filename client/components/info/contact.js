import React from 'react';
import ImageHeader from '../common/imageHeader';

const Contact = () => {
  const imageStyle = {
    backgroundImage: 'url(img/contact-bg.jpg)'
  };
  return (
    <div id="body-wrapper">
      <ImageHeader
        imageStyle={imageStyle}
        type={"header parallax full-screen"}
        heading={"Contact"}
        subheading={""}
        other={'<a class="scroll-btn" href="#about-content"><span></span></a>'}
      />
      <main id="about-content">
        <article className="post post-article">
          <div className="post-content">
            <p>Please contact me using the following information and I will response
            as soon as possible.</p>
            <ul>
              <li>Email: gxysqyx@gmail.com</li>
              <li>Cell Phone: (213)713-0720</li>
            </ul>
          </div>
        </article>
      </main>
    </div>

  );
};

export default Contact;

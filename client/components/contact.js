import React from 'react';
import ImageHeader from './common/imageHeader';

const Contact = () => {
  const imageStyle = {
    backgroundImage: 'url(img/contact-bg.jpg)'
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
                  <p>Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!</p>
                  <form name="sentMessage" id="contactForm">
                      <div className="control-group">
                          <div className="form-group floating-label-form-group controls">
                              <label>Name</label>
                              <input type="text" className="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="control-group">
                          <div className="form-group floating-label-form-group controls">
                              <label>Email Address</label>
                              <input type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Phone Number</label>
                              <input type="tel" className="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="control-group">
                          <div className="form-group floating-label-form-group controls">
                              <label>Message</label>
                              <textarea rows="5" className="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <br />
                      <div id="success"></div>
                      <div className="form-group">
                          <button type="submit" className="btn btn-secondary">Send</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>

  );
};

export default Contact;

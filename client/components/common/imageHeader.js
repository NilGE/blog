import React from 'react';

const ImageHeader = ({ imageStyle, type, heading, subheading, other}) => {
  return (
    <header className="intro-header" style={imageStyle}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                    <div className={type}>
                        <h1>{heading}</h1>
                        <h2 className="subheading">{subheading}</h2>
                        <span className="meta" dangerouslySetInnerHTML={{__html: other}} />
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

ImageHeader.propTypes = {
  imageStyle: React.PropTypes.object,
  type: React.PropTypes.string,
  heading: React.PropTypes.string,
  subheading: React.PropTypes.string,
  other: React.PropTypes.node
};

export default ImageHeader;

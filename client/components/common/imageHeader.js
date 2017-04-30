import React from 'react';

const ImageHeader = ({ imageStyle, type, heading, subheading, other}) => {
  return (
    <header className={type} style={imageStyle}>
        <div className="title-group">
            <h1 className="maintitle">{heading}</h1>
            <h2 className="subtitle">{subheading}</h2>
        </div>
        <span className="meta" dangerouslySetInnerHTML={{__html: other}} />
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

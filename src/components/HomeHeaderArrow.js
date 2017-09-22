import React from 'react';

const arrowStyle = {
  enableBackground: '0 0 300 23.2',
};

const polyStyle = {
  fill: 'hsl(204, 9%, 22%)',
};

const HomeHeaderArrow = () => (
  <div style={{ width: '100%', position: 'relative', top: '-2px' }}>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 300 23.2"
      style={arrowStyle}
      xmlSpace="preserve"
    >
      <polygon style={polyStyle} className="st0" points="0,0 300,0 150,23.2" />
    </svg>
  </div>
);
export default HomeHeaderArrow;

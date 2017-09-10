import React from 'react';

const shapeStyles = {
  float: 'inline-start',
  zIndex: -1,
  position: 'absolute',
  height: '50%',
  width: '90%',
};

const SHAPES_COUNT = 8;
const shapesHTML = new Array(SHAPES_COUNT).fill('').map((_, i) => {
  const shapeClass = `shape-container--${i} shape-animation`;
  return <div className={shapeClass}><div className="random-shape" /></div>;
});


export default function Shapes() {
  return <div id="shape-root" style={shapeStyles}>{shapesHTML}</div>;
}


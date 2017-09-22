import React from 'react';
import { Container } from 'reactstrap';
import ArrowDownThick from 'react-icons/lib/ti/arrow-down-thick';

const headerStyle = {
  background: 'radial-gradient(ellipse at 69% 50%, #2d2d39 15%,#343A3F 70%)',
  color: 'white',
  position: 'relative',
  top: '-1px',
  paddingBottom: '0.2em',
  textAlign: 'center',
};

const HomeHeader = () => (
  <Container id="header" fluid style={headerStyle}>
    <h1 id="hero-title" className="display-4">
      Activate Your Audience
    </h1>
    <h3 id="hero-subtitle" className="text-muted">
      Your next presentation could be not just informative but <strong id="fun">fun</strong>.
    </h3>
    <Container class="justify-content-center">
      <a
        id="learn-more-link"
        href="#about"
        style={{ height: '80px', fontSize: '16px' }}
        className="d-flex flex-column justify-content-between align-items-center"
      >
        <span>Learn More</span>
        <ArrowDownThick id="arrow-down" style={{ fontSize: '30px' }} />
      </a>
    </Container>
  </Container>
);

export default HomeHeader;

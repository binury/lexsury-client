import React from 'react';
import { Container } from 'reactstrap';

const HomeHeader = () => (
  <Container id="header">
    <h1 className="display-3">
      Activate Your Audience
    </h1>
    <h3 className="text-muted">
      Your next presentation could be not just informative but <strong id="fun">fun</strong>.
    </h3>
  </Container>
);

export default HomeHeader;

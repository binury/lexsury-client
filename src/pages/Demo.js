import React from 'react';
import DemoLexroom from '../demo/DemoLexRoom';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.state.isLoading) return null;
    return (
      <DemoLexroom roomName="sweet,lexsury,demo" />
    );
  }
}

export default Demo;

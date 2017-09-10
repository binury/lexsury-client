import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import * as Avatar from '../assets/avatars';
import * as LeftArrow from 'react-icons/lib/ti/arrow-left';
import * as RightArrow from 'react-icons/lib/ti/arrow-right';

const avatarStyle = {
  width: '150px',
  height: '150px',
};

const arrowLeftStyle = {
  position: 'absolute',
  top: '25%',
  left: '5%',
  zIndex: '1',
};

const arrowRightStyle = {
  position: 'absolute',
  top: '25%',
  right: '5%',
  zIndex: '1', // Maybe not needed
};

const paneNodes = Object.values(Avatar).map(avatar => <img style={avatarStyle} src={avatar} alt="avatar" />);

// change Swipe.js options by query params
const startSlide = 0;
const swipeOptions = {
  startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
  auto: 0,
  speed: 300,
  disableScroll: true,
  continuous: true,
  callback() {
    console.log('slide changed');
  },
  transitionEnd() {
    console.log('ended transition');
  },
};

class AvatarPicker extends Component {
  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }

  render() {
    return (
      <div className="center">
        <h3>Pick a buddy</h3>

        <LeftArrow
          size={30}
          style={arrowLeftStyle}
          onClick={this.prev.bind(this)}
        />

        <ReactSwipe
          ref={(input) => { this.reactSwipe = input; }}
          className="mySwipe"
          swipeOptions={swipeOptions}
        >
          {paneNodes}
        </ReactSwipe>

        <RightArrow
          size={30}
          style={arrowRightStyle}
          onClick={this.next.bind(this)}
        />
      </div>
    );
  }
}
export default AvatarPicker;

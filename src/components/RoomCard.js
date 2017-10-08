import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, ListGroupItem,
  ListGroupItemText,
} from 'reactstrap';
import { format } from 'date-fns';
import Cal from 'react-icons/lib/ti/calender';
import { Link } from 'react-router-dom';


class RoomCard extends React.Component {
  constructor({ handler, roomInfo }) {
    super();
    this.state = {
      showControls: false,
    };
    this.roomInfo = roomInfo;
    this.handler = handler;
  }

  handleClick = (event) => {
    event.preventDefault();
    this.toggleControls();
  };

  handleDel = (event) => {
    event.preventDefault();
    this.handler(this.roomInfo.id);
  };

  toggleControls = () => {
    this.setState({
      showControls: !this.state.showControls,
    });
  };

  render() {
    return (
      <Link to={`/lxr/${this.roomInfo.name}/admin`}>
        <ListGroupItem class="room-card" action>
          <Container
            hidden={!this.state.showControls}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              position: 'absolute',
              width: '85%',
            }}
            fluid
          >
            <Button
              outline
              color="primary"
              style={{ zIndex: 2 }}
              size="lg"
            >Hop In</Button>
            <Button
              outline
              color="danger"
              style={{ zIndex: 2 }}
              size="lg"
              onClick={this.handleDel}
            >Delete</Button>
          </Container>
          <ListGroupItemText
            style={{
              opacity: this.state.showControls ? 0 : 1,
            }}
          >
            <span className="room-header">
              {this.roomInfo.title || 'Untitled Room'}
            </span>
            <small className="room-type">{this.roomInfo.premium ? 'Premium' : 'Basic'}</small>
            <span>{this.roomInfo.description}</span>
            <span>{this.roomInfo.name}</span>
            <small className="align-bottom">
              <Cal />
              {format(new Date(this.roomInfo.createdAt), 'MM/DD/YYYY')}
            </small>
          </ListGroupItemText>
          <i
            className="ellipsis"
            onClick={this.handleClick}
            role="button"
            aria-roledescription="Room menu"
            tabIndex={0}
          />
        </ListGroupItem>
      </Link>
    );
  }
}

const boolOrBit = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired;
RoomCard.PropTypes = {
  roomInfo: PropTypes.shape({
    active: boolOrBit,
    createdAt: PropTypes.string.isRequired,
    creatorId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    moderationEnabled: boolOrBit,
    name: PropTypes.string.isRequired,
    premium: boolOrBit,
    public: boolOrBit,
  }),
};

export default RoomCard;

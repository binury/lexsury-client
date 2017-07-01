import io from 'socket.io-client';

class Socket {
  constructor(token, ns = '') {
    this.io = io(`${window.location.hostname}:3030/${ns}`, { query: `token=${token}` }); // TODO
    this.id = this.io.id;
    this.initSocket = this.initSocket.bind(this);
    this.ask = this.ask.bind(this);
    this.nick = this.nick.bind(this);
  }
  initSocket(callback, idhandler, userhandler) {
    this.io.on('assignment', idhandler);
    this.io.on('newQuestion', callback);
    this.io.on('newUser', userhandler);
  }
  ask(question) { this.io.emit('questionAsked', question); }
  nick(newName) { this.io.emit('nameChanged', newName); }
  vote(newVote) { this.io.emit('voteCast', newVote); }
}
export default Socket;

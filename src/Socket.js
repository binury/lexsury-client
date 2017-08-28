import io from 'socket.io-client';

class Socket {
  constructor(token, ns = '') {
    // ns: room.name && token: jwt authentication
    this.io = io(`${process.env.PUBLIC_URL}/${ns}`, { query: `token=${token}` });
    this.id = this.io.id;
    // Bindings allow usage in exported environment
    this.initSocket = this.initSocket.bind(this);
    this.ask = this.ask.bind(this);
    this.nick = this.nick.bind(this);
  }

  // Functions invoked upon message receipt
  initSocket(callback, idhandler, userhandler) {
    this.io.on('assignment', idhandler);
    this.io.on('questionAsked', callback);
    this.io.on('newUser', userhandler);
  }

  // Methods for emitting messages
  ask(question) { this.io.emit('questionAsked', question); }
  nick(newName) { this.io.emit('nameChanged', newName); }
  vote(questionId) { this.io.emit('voteCast', questionId); }
}
export default Socket;

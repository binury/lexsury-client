import io from 'socket.io-client';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

class Socket {
  constructor(token, ns = '') {
    // ns: room.name && token: jwt authentication
    this.io = io(`${URL}/${ns.split(',').join('')}`, { query: `token=${token}` });
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
  ask(question, anon) { this.io.emit('questionAsked', question, anon); }
  nick(newName) { this.io.emit('nameChanged', newName); }
  vote(questionId) { this.io.emit('voteCast', questionId); }
  hide(questionId) { this.io.emit('questionToggled', questionId); }
  archive(questionId) { this.io.emit('questionArchived', questionId); }
}
export default Socket;

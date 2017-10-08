import io from 'socket.io-client';
import { URL } from './helpers';

class Socket {
  constructor(token, ns = '') {
    // ns: room.name && token: jwt authentication
    this.io = io(`${URL}/${ns.split(',').join('')}`, { query: `token=${token}` });
    this.id = this.io.id;
  }

  // Functions invoked upon message receipt
  // TODO: Refactor- not really needed anymore
  onQuestionAsked = (callback) => {
    this.io.on('questionAsked', callback);
  };
  onSettingUpdated = (callback) => {
    this.io.on('settingUpdated', callback);
  };

  // Methods for emitting messages
  ask = (question, anon) => { this.io.emit('questionAsked', question, anon); };
  nick = (newName) => { this.io.emit('nameChanged', newName); };
  vote = (questionId) => { this.io.emit('voteCast', questionId); };
  hide = (questionId) => { this.io.emit('questionToggled', questionId); };
  archive = (questionId) => { this.io.emit('questionArchived', questionId); };
  updateSetting = (setting) => { this.io.emit('settingUpdated', setting); };
  moderate = (question) => { this.io.emit('questionModerated', question); };
}
export default Socket;

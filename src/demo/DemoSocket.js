class Socket {
  constructor(store) { this.store = store; }
  ask = (question) => { this.store.newQuestion(question); };
  nick = (newName) => { this.io.emit('nameChanged', newName); };
  vote = (questionId) => { this.store.vote(questionId); };
  hide = (questionId) => { this.store.hide(questionId); };
  archive = (questionId) => { this.store.hide(questionId); };
  updateSetting = (setting) => { this.store.updateSetting(setting); };
  moderate = (question) => { this.store.moderate(question); };
}
export default Socket;

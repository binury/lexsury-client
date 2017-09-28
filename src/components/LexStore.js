/* eslint-disable react/no-multi-comp,import/no-duplicates,spaced-comment */
// import mobx from 'mobx';
import { computed, observable } from 'mobx';
import * as mobx from 'mobx';
import decode from 'jwt-decode';
import Socket from '../Socket';
import { getToken } from '../helpers';

class ObservableLexStore {
  @observable todos = [];
  @observable pendingRequests = 0;
  @observable questions = [];
  @observable roomName = '';
  @observable roomInfo;
  @observable socket = {};
  @observable newQuestionText = 'Enter a question';
  @observable isFullscreen = false;
  @observable moderationEnabled;

  constructor(props) {
    this.roomName = props.roomName;
    this.toggleFullScreen = ::this.toggleFullScreen;
    this.toggleModeration = ::this.toggleModeration;
    if (getToken() && props.roomName) {
      this.sock = new Socket(getToken(), props.roomName);
      this.sock.onQuestionAsked(this.updateQuestions);
      this.sock.onSettingUpdated(this.updateSetting);
    }
    mobx.autorun(() => this.report); // TODO
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true,
    ).length;
  }

  @computed
  get report() {
    return (this.roomInfo) ? Object.entries(this.roomInfo) : null;
  }

  @computed
  get isRoomOwner() {
    return (getToken() && this.roomInfo) ?
      this.roomInfo.creatorId === decode(getToken()).userId :
      false;
  }

  @computed
  get validQuestions() {
    return this.questions.filter(question => (
      !question.hidden &&
      !question.archived &&
      (!this.roomInfo.moderationEnabled || question.approved)));
  }

  updateQuestions = (questions) => {
    this.questions = questions;
  };

  // test
  updateSetting = (setting) => {
    this.roomInfo = setting;
    // Object.assign(this.roomInfo, setting);
  };

  toggleModeration() {
    this.sock.updateSetting({ moderationEnabled: !this.roomInfo.moderationEnabled });
  }

  toggleFullScreen() { this.isFullscreen = !this.isFullscreen; }


}

export default ObservableLexStore;


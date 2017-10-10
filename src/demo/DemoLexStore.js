/* eslint-disable react/no-multi-comp,import/no-duplicates,spaced-comment */
// import mobx from 'mobx';
import { computed, observable } from 'mobx';
import * as mobx from 'mobx';
import Socket from './DemoSocket';

class DemoLexStore {
  @observable pendingRequests = 0;
  @observable questions = [];
  @observable roomName = 'sweet,lexsury,demo';
  @observable roomInfo;
  @observable socket = {};
  @observable newQuestionText = 'Enter a question';
  @observable isFullscreen = false;
  @observable moderationEnabled;

  constructor(props) {
    this.roomName = props.roomName;
    this.toggleFullScreen = ::this.toggleFullScreen;
    this.toggleModeration = ::this.toggleModeration;
    this.sock = new Socket(this);
    this.roomInfo = {
      title: 'Totally Awesome Demo',
      descr: 'A live demo of Lexsury features',
      name: this.roomName,
    };

    mobx.autorun(() => this.report); // TODO
  }

  @computed
  get report() {
    return (this.roomInfo) ? Object.entries(this.roomInfo) : null;
  }

  @computed
  get validQuestions() {
    return this.questions.filter(question => (
      !question.hidden &&
      !question.archived &&
      (!this.roomInfo.moderationEnabled || question.approved)));
  }

  newQuestion = (question) => {
    this.questions.push(question); // dunno if this works
  };

  updateQuestions = (questions) => {
    this.questions = questions;
  };

  // test
  updateSetting = (setting) => {
    this.roomInfo = setting;
  };

  toggleModeration() {
    this.sock.updateSetting({ moderationEnabled: !this.roomInfo.moderationEnabled });
  }

  toggleFullScreen() { this.isFullscreen = !this.isFullscreen; }
}

export default DemoLexStore;


/* eslint-disable react/no-multi-comp,import/no-duplicates */
// import mobx from 'mobx';
import { computed, observable } from 'mobx';
// import Socket from '../Socket';
// import { getToken } from '../helpers';

class ObservableLexStore {
  @observable todos = [];
  @observable pendingRequests = 0;
  @observable questions = [];
  @observable roomName = '';
  @observable isRoomOwner = false;
  @observable socket = {};
  @observable newQuestionText = 'Enter a question';
  @observable isFullscreen = false;

  constructor(props) {
    this.roomName = props.roomName;
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    // this.socket = new Socket(getToken(), params.roomName);
    // mobx.autorun(() => console.log(this.report));
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true,
    ).length;
  }

  @computed
  get report() {
    if (this.questions.length === 0) { return '<none>'; }
    return Object.entries(this.questions[this.questions.length - 1]);
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: null,
    });
  }

  updateQuestions(questions) {
    this.questions = questions;
  }

  toggleFullScreen() { this.isFullscreen = !this.isFullscreen; console.log(this.isFullscreen); }


}

export default ObservableLexStore;


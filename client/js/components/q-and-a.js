import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class QandA extends Component {
  constructor(props) {
    super(props);

    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchQuestion(this.props.userid));
  }

  correctAnswer(e) {
    this.props.dispatch(actions.postAnswer(true, this.props.userid));
  }

  wrongAnswer(e) {
    this.props.dispatch(actions.postAnswer(false, this.props.userid));
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <h1>
          Question:
        </h1>
        <h2>
          {this.props.question.question.question}
        </h2>
        <h1>
          Answer:
        </h1>
        <h2>
          {this.props.question.question.answer}
        </h2>
        <button id="right" onClick={this.correctAnswer}>
          Correct
        </button>
        <button id="wrong" onClick={this.wrongAnswer}>
          Incorrect
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  question: state.question,
  userid: state.userid,
  loading: state.loading,
});

export default connect(mapStateToProps)(QandA);

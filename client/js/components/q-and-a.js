import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class QandA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchQuestion(this.props.username));
  }

  showAnswer() {
    this.props.dispatch(actions.showAnswer());
  }

  handleChange(event) {
    this.setState({answer: event.target.value});
  }

  handleSubmit(event) {
    let answer = this.props.question.question.answer.toLowerCase();
    let submission = this.state.answer.toLowerCase();

    console.log('Correct answer', answer);
    console.log('Answer submitted', submission);

    event.preventDefault();

    if (answer === submission) {
      alert('You got it right!');
      this.props.dispatch(actions.postAnswer(true, this.props.username));
    } else {
      alert('Sorry, the correct answer was: ' + this.props.question.question.answer);
      this.props.dispatch(actions.postAnswer(false, this.props.username));
    }

    this.setState({answer: ''});
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
        <div className="qanda-container">
          <div className="tagalog-card">
            <h1 className="tagalog-title">
              Tagalog:
            </h1>
            <h2 className="tagalog-question">
              {this.props.question.question.question}
            </h2>
          </div>
          <div className="english-card">
            <h1 className="english-title">
              English:
            </h1>
            <h2 className="english-question" onClick={this.showAnswer}>
              {this.props.showAnswer
              ? this.props.question.question.answer : '(click to reveal)'}
            </h2>
          </div>
          <div className="answer-and-score">
            <form onSubmit={this.handleSubmit} className="answer-form">
              <label>
                Your answer:
                <input
                  type="text"
                  className="answer input"
                  value={this.state.answer}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" className="submit input"/>
            </form>
            <div className="score">
              Current score:  {this.props.question.score}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  question: state.question,
  username: state.username,
  loading: state.loading,
  showAnswer: state.showAnswer,
});

export default connect(mapStateToProps)(QandA);

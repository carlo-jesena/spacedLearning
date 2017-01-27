import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
    };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  }

  handleAnswerChange(event) {
    this.setState({answer: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // console.log(this.state);

    this.props.dispatch(actions.addQuestion(
      this.props.username,
      this.state
    ));

    this.setState({
      question: '',
      answer: ''
    });
  }

  render() {
    console.log('footer rendering');
    return (
      <footer className="footer">
        <form onSubmit={this.handleSubmit} className="new-question">
          <label>
            New Spanish:
            <input
              type="text"
              className="new-question input"
              value={this.state.question}
              onChange={this.handleQuestionChange}
            />
            <br />
            New English:
            <input
              type="text"
              className="new-question input"
              value={this.state.answer}
              onChange={this.handleAnswerChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
    	</footer>
    );
  }
}


const mapStateToProps = (state, props) => ({
  username: state.username,
});

export default connect(mapStateToProps)(Header);

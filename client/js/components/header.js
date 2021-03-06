import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      newUser: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleNewUserChange = this.handleNewUserChange.bind(this);
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUsers());
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
    this.props.dispatch(actions.changeUser(this.state.value));
    this.props.dispatch(actions.fetchQuestion(this.state.value));
  }

  handleNewUserChange(event) {
    this.setState({newUser: event.target.value});
  }

  handleNewUserSubmit(event) {
    event.preventDefault();

    this.props.dispatch(actions.createUser(this.state.newUser));
    this.setState({ newUser: '' });
    this.props.dispatch(actions.getUsers());
  }

  render() {
    const userOptions = this.props.userList.map(user =>
      <option value={user} key={user}>
        {user}
      </option>
    );

    return (
      <header className="page-header">
        <p className="titleheader">
          Espangol
        </p>
        <p className="username">
          Logged in as: {this.props.username}
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Available users:
            <select
              value={this.state.value}
              onChange={this.handleChange}
              className="select input"
            >
              {userOptions}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={this.handleNewUserSubmit} className="new-user">
          <label>
            Create User:
            <input
              type="text"
              className="new-user input"
              value={this.state.newUser}
              onChange={this.handleNewUserChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
    	</header>
    );
  }
}


const mapStateToProps = (state, props) => ({
  userList: state.userList,
  username: state.username,
  usersLoading: state.usersLoading,
});

export default connect(mapStateToProps)(Header);

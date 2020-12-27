import React, { Component } from 'react';
import api from './api';
class CreateUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: ''
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const request = {
      username: this.state.username
    }

    console.log(request);

    api().post('/user/add', request)
      .then(response => console.log(response.data))
      .catch(error => console.log(error) );

    this.setState({ username: '' })
  }

  render(){
    return(
      <div>
        <h3>Create New User</h3>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;

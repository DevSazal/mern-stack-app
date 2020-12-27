import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { Alert } from 'antd';
// import 'antd/dist/antd.css';
// import { Link } from 'react-router-dom';

class CreateExercise extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [] // array
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // let urlElements = window.location.href.split('/');
    // let url = urlElements[2].split(':');
    // console.log(url[0]);
    axios.get('//'+window.location.hostname+':5000/api/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeInput(e){
    //e.persist();
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDate(date){
    this.setState({ date: date });
  }

  onSubmit(e){
    e.preventDefault();

    const request = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(request);

    axios.post('http://localhost:5000/api/exercise/add', request)
      .then(response => {
        this.setState({
          description: '',
          duration: 0
         });
        console.log(response.data);
      })
      .catch(error => console.log(error.response));

    // window.location = '/';
  }
  render(){
    return(
      <div>
        <h3>Create New Exercise Log</h3>
        <br/>
        <form method="POST" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select name="username"
                required
                className="form-control"

                onChange={this.onChangeInput}>
                {
                  this.state.users.map(function(user) {
                    return <option
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" name="description"

                className="form-control"
                value={this.state.description}
                onChange={this.onChangeInput}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
                type="text" name="duration"
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeInput}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;

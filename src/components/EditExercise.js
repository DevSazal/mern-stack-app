import React, { Component } from 'react';
import api from './api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';

class EditExercise extends Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false,
      username: '',
      description: '',
      duration: 0,
      date: null
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    api().get('/exercise/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch(error => console.log(error));
  }

  onChangeInput(e){
   //e.persist();
   this.setState({ [e.target.name]: e.target.value });
 }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const request = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(request);

    api().put('/exercise/update/' + this.props.match.params.id, request)
      .then(response => {
        this.setState({ redirect: true });
        console.log(response.data);
      })
      .catch(error => console.log(error));

  }

  render(){
    if(this.state.redirect){
      return (<Redirect to={'/'} />)
    }
    return(
      <div>
        <h3>Edit Exercise Log</h3>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select name="username"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeInput} disabled>
                {

                     <option
                      key={this.state.username}
                      value={this.state.username}>{this.state.username}
                      </option>

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
                type="number" name="duration"
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
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;

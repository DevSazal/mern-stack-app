import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

// Another Functional Component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id, props.index) }}>delete</a>
    </td>
  </tr>
)

class ExercisesList extends Component {
  constructor(props){
    super(props);

    this.state = {
      exercises: []
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    api().get('/exercise/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id, index) {
    api().delete('/exercise/'+id)
      .then(response => { console.log(response.data)});

    // this.setState({
    //   exercises: this.state.exercises.filter(el => el._id !== id)
    // })
    let exercises = this.state.exercises;
    exercises.splice(index, 1); // Delete one element by array index number from react state
    this.setState({ exercises: exercises });
    console.log('deleted '+index);
  }

  exerciseList() {
    return this.state.exercises.map( (currentexercise, index) => {
      return <Exercise exercise={currentexercise} index={index} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render(){
    return(
      <div>
        <h3>Logged Exercises</h3>
        <br/>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;

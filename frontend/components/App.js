import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'
import {v4 as uuid} from 'uuid'


/*
 * Hold all todos in state within the App.js component
 * Allow for a todo's completed status to be toggled back and forth when clicking on a todo
 * Allow for a todo to be added when submitting the new todo form
 * Allow for completed todos to be filtered out of view when clicking the clear completed button
 *  
 * Your app should display a list of todos
 * an input field
 * a submit button
 * and a button to filter out completed todos
 * 
 * App:       
 *      hold state machinery
 *      application state, held in component state
 *      state-changing methods, event handlers    
 * TodoList:
 *      receives todos array and iterates, generating Todo for each
 * Todo:
 *      takes in todo data and displays
 * Form:
 *      holds input field and Add Todo and Clear Completed buttons
 *      input field should take in user input
 *          user can click Submit button or press Enter
 *      once submitted, Todo List should re-render and show added todo
 */

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  errorMessage: '',
  todos: [],
  userInput: '',
}

export default class App extends React.Component {
  // set initial state
  state = initialState;
  // fetch request to update todos in state
  
  componentDidMount() {
    this.getList();
  }

  getList =()=>{
    axios.get(URL)
      .then(response => {
        this.setState({
          ...this.state,
          todos: response.data.data,
          successMessage: response.message
        })
      })
      .catch(err => {
        console.log(this.state)
        debugger
        this.setState({
          ...this.state,
          errorMessage: 'Oops',
        })
      })
  }

  submitForm = () => {
    const newTodo = {
      name: this.state.userInput,
      id: uuid(),
      completed: false,
    }
    axios.post(URL, newTodo)
      .then(response => {
        this.getList();
        this.setState({
          ...this.state,
          userInput: '',
        })
      })
      .catch(err => {
        this.setState({
          ...this.state,
          errorMessage: err.response.data.message,
        })
      })
  }

  // Handler - Toggle Complete
  toggleComplete = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(response => {
        this.setState({
          ...this.state,
          successMessage: response.message,
          todos: this.state.todos.map(entry => {
            return entry.id === id
              ? { ...entry, completed: !entry.completed }
              : entry
          })
        })
        console.log(this.state)
      })
      .catch(err => {
        this.setState({
          ...this.state,
          errorMessage: err.response.message,
        })
      })

    this.setState({
      ...this.state,
      todos: this.state.todos
    })
  }
  // handler for user input
  todoInput = (value) => {
    this.setState({
      ...this.state,
      userInput: value,
    })
  }

  render() {
    const { todos, userInput } = this.state;

    return (
      <div>
        <TodoList todos={todos} toggleComplete={this.toggleComplete} />
        <Form 
          onSubmit={this.submitForm}
          onChange={this.todoInput}
          input={userInput}
        />
      </div>
    )
  }
}

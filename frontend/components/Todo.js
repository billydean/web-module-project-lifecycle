import React from 'react'

export default class Todo extends React.Component {
  render() {
    const {todo, toggleComplete } = this.props;
    return (
      <li onClick={()=>{toggleComplete(todo.id)}}>
        {todo.name}
      </li>
    )
  }
}

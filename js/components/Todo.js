import React, {Component} from 'react'
import Relay from 'react-relay'

class Todo extends Component {
  removeTodo = () => {
    this.props.removeTodo(this.props.todo)
  }
  render() {
    const {todo} = this.props
    return (
       <li>{todo.text} (ID: {todo.id})  <a onClick={this.props.removeTodo}>X</a></li>
    )
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        text,
        complete
      }
    `,
  },
});

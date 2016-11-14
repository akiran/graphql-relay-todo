import React, {Component} from 'react'
import Relay from 'react-relay'

class Todo extends Component {
  render() {
    const {todo} = this.props
    return (
       <li>{todo.text} (ID: {todo.id})</li>
    )
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        text
      }
    `,
  },
});

import React, {Component} from 'react'
import Relay from 'react-relay'

class TodoList extends Component {
  render() {
    console.log(this.props.viewer, 'todolist')
    return (
      <div>
         <h3>Your todo list</h3>
        <ul>
          {this.props.viewer.todos.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.text} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Relay.createContainer(TodoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(first: 10) {
          edges {
            node {
              id,
              text,
            },
          },
        },
      }
    `,
  },
});

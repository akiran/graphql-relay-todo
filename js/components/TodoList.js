import React, {Component} from 'react'
import Relay from 'react-relay'
import Todo from './Todo'

class TodoList extends Component {
  loadMore = () => {
    const {setVariables, variables} = this.props.relay
    setVariables({
      size: variables.size + 2
    })
  }
  render() {
    console.log(this.props.viewer.todos, 'todolist')
    return (
      <div>
         <h3>Your todo list</h3>
        <ul>
          {this.props.viewer.todos.edges.map((edge, index) =>
            <Todo todo={edge.node} key={index} />
          )}
        </ul>
        <button onClick={this.loadMore} style={{color: '#000', background: '#ccc'}}>
          Load More
        </button>
      </div>
    )
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    size: 2
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(first: $size) {
          edges {
            node {
              ${Todo.getFragment('todo')}
            },
          },
        },
      }
    `,
  },
});

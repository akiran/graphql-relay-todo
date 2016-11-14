import React, {Component} from 'react'
import Relay from 'react-relay'

class TodoList extends Component {
  loadMore = () => {
    const {setVariables, variables} = this.props.relay
    setVariables({
      size: variables.size + 2
    })
  }
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
              id,
              text,
            },
          },
        },
      }
    `,
  },
});

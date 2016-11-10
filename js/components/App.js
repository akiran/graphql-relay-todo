import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Todo list</h1>
        <ul>
          {this.props.viewer.todos.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.text} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
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

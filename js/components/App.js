import React from 'react'
import Relay from 'react-relay'
import TodoList from './TodoList'

class App extends React.Component {
  render() {
    console.log(this.props.viewer, 'app')
    return (
      <div>
        <h1>Hello {this.props.viewer.name}</h1>
        <TodoList viewer={this.props.viewer} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
        ${TodoList.getFragment('viewer')}
      }
    `,
  },
});

import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    node: () => Relay.QL`
      query {
        node(id: "VXNlcjptZQ==")
      }
    `
  };
  static routeName = 'AppHomeRoute';
}

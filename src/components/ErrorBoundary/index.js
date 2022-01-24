import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    console.log('calling error', error, info);
    this.setState({hasError: true});
    // Add Error Logging here
  }

  render() {
    return this.props.children;
  }
}

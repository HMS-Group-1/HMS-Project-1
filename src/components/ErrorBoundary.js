import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }
  static getDerivedStateFromError(error){
   return{hasError : true};
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong {this.state.message}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

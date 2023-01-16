import React from 'react';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { showModal } from '@src/slices/modal';

// class ErrorBoundary extends React.Component {
//   state = { error: false };

//   // useEffect
//   componentDidMount() {}

//   // Error cacth
//   static getDerivedStateFromError(error) {
//     console.log('zz?');

//     return { error: true };

//     // this.props.dispatch(
//     //   showModal({
//     //     code: 1000,
//     //   }),
//     // );
//   }

//   render() {
//     const { error } = this.state;

//     console.log(error)

//     return this.props.children;
//   }
// }

// /**
//  * https://codesandbox.io/s/redux-toolkit-class-components-forked-lvs0s7?file=/src/ClassComponentV2.tsx
//  * @param {*} state
//  * @returns
//  */
// const mapStateToProps = (state) => ({});
// export default ErrorBoundary;

class ErrorBoundries extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    const { hasError } = this.state;

    console.log(hasError);

    return this.props.children;
  }
}

export default ErrorBoundries;

import React from 'react';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { showModal } from '@src/slices/modal';

class ErrorBoundary extends React.Component {
  state = { error: false };

  // useEffect
  componentDidMount() {}

  componentDidCatch(error, errorInfo) {
    Reactotron.log('error');
  }

  // Error cacth
  static getDerivedStateFromError(error) {
    // return { error: true };

    this.props.dispatch(
      showModal({
        code: 1000,
      }),
    );
  }

  render() {
    // const { error } = this.state;

    return this.props.children;
  }
}

/**
 * https://codesandbox.io/s/redux-toolkit-class-components-forked-lvs0s7?file=/src/ClassComponentV2.tsx
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(ErrorBoundary);

import React, { Suspense } from 'react';
import AppIndex from './AppIndex';
import ErrorBoundary from './ErrorBoundary';

import { useQueryErrorResetBoundary } from 'react-query';

function AsyncBoundary() {
  //   const { reset } = useQueryErrorResetBoundary();
  //   const resetHandler = React.useCallback(() => {
  //     reset();
  //   }, [reset]);

  return (
    <ErrorBoundary>
      <AppIndex />
    </ErrorBoundary>
  );
}

export default AsyncBoundary;

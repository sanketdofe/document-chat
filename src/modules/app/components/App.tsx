import React from 'react';
import {
  AppProtectedRoutes,
  AppUnprotectedRoutes,
} from '../routes/auth-routes';
import { useAtomValue } from 'jotai';
import { AuthAtom } from '../../../shared/states/authenticated';
import { AlertBar } from '../../../shared/components/alert-bar/alert-bar';

const App = () => {
  const authAtom = useAtomValue(AuthAtom);

  if (authAtom.isAuthenticated) {
    return (
      <>
        <AppProtectedRoutes />
        <AlertBar />
      </>
    );
  }

  return (
    <>
      <AppUnprotectedRoutes />
      <AlertBar />
    </>
  );
};

export default App;

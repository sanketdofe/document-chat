import React, { memo, useEffect, useState } from 'react';
import {
  AppProtectedRoutes,
  AppUnprotectedRoutes,
} from '../routes/auth-routes';
import { Provider, useAtomValue } from 'jotai';
import { AuthAtom } from '../../../shared/states/authenticated';

const App = memo(() => {
  const [cacheKey, setCacheKey] = useState('');
  const authAtom = useAtomValue(AuthAtom);

  useEffect(() => {
    setCacheKey(Date.now().toString());
  }, []);

  if (authAtom.isAuthenticated) {
    return (
      <Provider key={cacheKey}>
        <AppProtectedRoutes />
      </Provider>
    );
  }

  return <AppUnprotectedRoutes />;
});

export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../../../../shared/constants/routes';
import Loader from '../../../../shared/components/loaders/loader';
import { LOADING } from '../../../../shared/constants/common';

const LoginLazyComponent = lazy(() => import('../../../login/components'));
const HomeLazyComponent = lazy(() => import('../../../home/components'));
const NewChatLazyComponent = lazy(
  () => import('../../../chat/components/new-chat')
);
const ChatLazyComponent = lazy(() => import('../../../chat/components'));

export function AppProtectedRoutes() {
  return (
    <Routes>
      <Route
        key={ROUTES.NEW_CHAT}
        path={ROUTES.NEW_CHAT}
        element={
          <Suspense fallback={<Loader size={32} secondary={LOADING} />}>
            <NewChatLazyComponent />
          </Suspense>
        }
      />
      <Route
        key={ROUTES.CHAT}
        path={ROUTES.CHAT}
        element={
          <Suspense fallback={<Loader size={32} secondary={LOADING} />}>
            <ChatLazyComponent />
          </Suspense>
        }
      />
      <Route
        key={ROUTES.HOME}
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<Loader size={32} secondary={LOADING} />}>
            <HomeLazyComponent />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
}

export function AppUnprotectedRoutes() {
  return (
    <Routes>
      <Route
        key={ROUTES.LOGIN}
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<Loader size={32} secondary={LOADING} />}>
            <LoginLazyComponent />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
    </Routes>
  );
}

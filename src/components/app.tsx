import { FC } from 'react'
import { AuthenticationContextProvider } from './contexts/authentication-context';
import { EditContainer } from './edit/edit-container';

/**
 * Application entry point.
 */
export const App: FC = () => (
  <AuthenticationContextProvider>
    <EditContainer />
  </AuthenticationContextProvider>
);

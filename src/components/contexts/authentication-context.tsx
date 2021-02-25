import { createContext, FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import config from '../../util/config';
import { UserData } from '../../util/types/data-types';
import { AccessTokenResponse, GetUserResponse } from '../../util/types/response-types';

/**
 * Authentication context state.
 */
export interface AuthenticationContextState {
  authUser: UserData;
  setAuthUser(authUser: UserData): void;
}

/**
 * Authentication context.
 */
export const AuthenticationContext = createContext<AuthenticationContextState>({
  authUser: null, setAuthUser: null
});

/**
 * Authentication context provider. 
 */
export const AuthenticationContextProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<UserData>(null);
  const accessTokenQuery = useQuery<AccessTokenResponse>();
  const userQuery = useQuery<GetUserResponse>();

  useEffect(() => {
    const accessToken = localStorage.getItem(config.localStorage.accessToken);
    const refreshToken = localStorage.getItem(config.localStorage.refreshToken);
    if (accessToken && refreshToken) {
      switch (accessTokenQuery.status) {
        case Status.INIT:
          accessTokenQuery.post(`${config.api.url}/auth/accessToken`, {
            refresh_token: localStorage.getItem(config.localStorage.refreshToken)
          });
          break;
        case Status.SUCCESS:
          localStorage.setItem(config.localStorage.accessToken, accessTokenQuery.response.access_token);
          userQuery.get(`${config.api.url}/users/info`, {
            headers: { 'x-access-token': accessTokenQuery.response.access_token }
          });
          break;
        case Status.ERROR:
          console.log('Can\'t connect user :', ...accessTokenQuery.errorResponse.errors);
          break;
        default: break;
      }
    }
  }, [accessTokenQuery.status]);

  useEffect(() => {
    switch (userQuery.status) {
      case Status.SUCCESS:
        setAuthUser(userQuery.response.user);
        break;
      case Status.ERROR:
        console.log('Can\'t connect user :', ...userQuery.errorResponse.errors);
        break;
    }
  }, [userQuery.status]);

  return (
    <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthenticationContext.Provider>
  );
}

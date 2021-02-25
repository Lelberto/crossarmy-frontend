import { ArmyData, ErrorData, UserData } from './data-types';

/**
 * Base API response.
 */
export interface Response {
  [key: string]: unknown;
}

/**
 * Error response.
 */
export interface ErrorResponse extends Response {
  errors: ErrorData[];
}

/**
 * Access token response.
 */
export interface AccessTokenResponse extends Response {
  access_token: string;
}

/**
 * Refresh token response.
 */
export interface RefreshTokenResponse extends Response {
  access_token: string;
  refresh_token: string;
}

/**
 * Creation response.
 * 
 * This API response is returned by any `POST` that creates a new resource.
 */
export interface CreationResponse extends Response {
  id: string;
}

/**
 * Get users response.
 * 
 * This response is returned by `GET /users`.
 */
export interface GetUsersResponse extends Response {
  users: UserData[];
}

/**
 * Get user response.
 * 
 * This response is returned by `GET /users/:id`.
 */
export interface GetUserResponse extends Response {
  user: UserData;
}

/**
 * Get armies response.
 * 
 * This response is returned by `GET /users/:id/armies`.
 */
export interface GetArmiesResponse extends Response {
  armies: ArmyData[];
}

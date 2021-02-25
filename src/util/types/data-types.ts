import { EntityConfiguration } from './configuration-types';

/**
 * ID.
 * 
 * This interface is used with data interfaces that have ID by extending this.
 */
interface ID {
  id?: string;
}

/**
 * Timestamps.
 * 
 * This interface is used with data interfaces that have timestamps by extending this.
 */
interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * User data.
 */
export interface UserData extends ID, TimeStamps {
  email: string;
  name: string;
  password?: string;
  armies: ArmyData[];
}

/**
 * Army data.
 */
export interface ArmyData extends ID {
  owner: UserData;
  size: { width: number, height: number };
  entities: EntityData[];
}

/**
 * Entity data.
 */
export interface EntityData {
  position: { x: number, y: number };
  size: { width: number, height: number };
  color: string;
  config: EntityConfiguration;
}

/**
 * Error data.
 */
export interface ErrorData {
  error: ErrorCode;
  error_description: string;
}

/**
 * Error code type.
 */
export type ErrorCode =
    'access_denied'
  | 'invalid_client'
  | 'invalid_grant'
  | 'invalid_request'
  | 'invalid_scope'
  | 'network_error'
  | 'not_found'
  | 'server_error'
  | 'temporarily_unavailable'
  | 'unauthorized_client'
  | 'unsupported_grant_type'
  | 'unsupported_response_type'
  | 'validation_failed';

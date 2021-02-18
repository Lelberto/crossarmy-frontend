/**
 * Entity configuration interface.
 */
export interface EntityConfiguration {
  type: EntityType;
}

/**
 * Entity type enumeration.
 */
export enum EntityType {
  BARBARIAN = 0,
  ARCHER = 1
}
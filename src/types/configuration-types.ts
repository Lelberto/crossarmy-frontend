/**
 * Entity configuration.
 */
export interface EntityConfiguration {
  type: EntityType;
}

/**
 * Living entity configuration.
 */
export interface LivingEntityConfiguration extends EntityConfiguration {
  speed: number;
}

/**
 * Barbarian configuration.
 */
export interface BarbarianConfiguration extends LivingEntityConfiguration {
  speedMultiplier: number;
}

/**
 * Archer configuration.
 */
export interface ArcherConfiguration extends LivingEntityConfiguration {
  shootSpeed: number;
}

/**
 * Entity type enumeration.
 */
export enum EntityType {
  BARBARIAN = 'barbarian',
  ARCHER = 'archer'
}
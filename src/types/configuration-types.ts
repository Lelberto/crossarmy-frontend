/**
 * Entity configuration interface.
 */
export interface EntityConfiguration {
  type: EntityType;
}

/**
 * Living entity configuration interface.
 */
export interface LivingEntityConfiguration extends EntityConfiguration {
  speed: number;
}

/**
 * Barbarian configuration interface.
 */
export interface BarbarianConfiguration extends LivingEntityConfiguration {
  speedMultiplier: number;
}

/**
 * Archer configuration interface.
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
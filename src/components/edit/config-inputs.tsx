import { forwardRef, HTMLProps } from 'react';

/**
 * Speed input.
 */
export const SpeedInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(({ id, className, type, name, children, ...rest }, ref) => (
  <div>
    <label htmlFor={id || 'speed'}>Speed </label>
      <input ref={ref} id={id || 'speed'} className={className} type={type || 'number'} name={name || 'speed'} {...rest} />
      {children}
  </div>
));

/**
 * Speed multiplier input.
 */
export const SpeedMultiplierInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(({ id, className, type, name, children, ...rest }, ref) => (
  <div>
    <label htmlFor={id || 'speedMultiplier'}>Speed multiplier </label>
    <input ref={ref} id={id || 'speedMultiplier'} className={className} type={type || 'number'} name={name || 'speedMultiplier'} {...rest} />
    {children}
  </div>
));

/**
 * Shoot speed input.
 */
export const ShootSpeedInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(({ id, className, type, name, children, ...rest }, ref) => (
  <div>
    <label htmlFor={id || 'shootSpeed'}>Shoot speed </label>
    <input ref={ref} id={id || 'shootSpeed'} className={className} type={type || 'number'} name={name || 'shootSpeed'} {...rest} />
    {children}
  </div>
));

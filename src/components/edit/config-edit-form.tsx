import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EntityConfiguration, EntityType } from '../../types/configuration-types';
import { ShootSpeedInput, SpeedInput, SpeedMultiplierInput } from './config-inputs';

/**
 * Configuration edit form values.
 */
export type ConfigEditFormValues = EntityConfiguration;

/**
 * Configuration edit form props.
 */
export type ConfigEditFormProps = {
  type?: EntityType;
  onSubmit?(values: ConfigEditFormValues): void;
}

/**
 * Configuration edit form.
 * 
 * This form is the second part of the edit form. It manages the entity configuration.
 * 
 * @param type Entity type
 * @param onSubmit When the form is submitted
 */
export const ConfigEditForm: FC<ConfigEditFormProps> = ({ type, onSubmit }) => {
  const { register, handleSubmit } = useForm<ConfigEditFormValues>({
    defaultValues: {}
  });

  const handleChange = handleSubmit(values => onSubmit(values));

  const inputs = useMemo(() => {
    switch (type) {
      case EntityType.BARBARIAN: return (
          <div>
            <SpeedInput ref={register({ valueAsNumber: true })} onChange={handleChange} />
            <SpeedMultiplierInput ref={register({ valueAsNumber: true })} onChange={handleChange} />
          </div>
        );
      case EntityType.ARCHER: return (
        <div>
          <SpeedInput ref={register({ valueAsNumber: true })} onChange={handleChange} />
          <ShootSpeedInput ref={register({ valueAsNumber: true })} onChange={handleChange} />
        </div>
      );
      default: return <></>;
    }
  }, [type]);
  

  return (
    <form onSubmit={handleChange}>
      {inputs}
    </form>
  );
}

ConfigEditForm.defaultProps = {
  type: EntityType.BARBARIAN
}

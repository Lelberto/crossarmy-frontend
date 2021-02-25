import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { EntityType } from '../../util/types/configuration-types';

/**
 * Basic edit form values.
 */
export type BasicEditFormValues = {
  type: EntityType;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

/**
 * Basic edit form props.
 */
export type BasicEditFormProps = {
  onSubmit?(values: BasicEditFormValues): void;
}

/**
 * Basic edit form.
 * 
 * This form is the first part of edit form. It manages the entity base attributes.
 * 
 * @param onSubmit When the form is submitted
 */
export const BasicEditForm: FC<BasicEditFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<BasicEditFormValues>({
    defaultValues: { type: EntityType.BARBARIAN, positionX: 0, positionY: 0, width: 1, height: 1 }
  });

  const handleChange = handleSubmit(values => onSubmit(values));

  return (
    <form onSubmit={handleChange}>
      <select ref={register} name="type" onChange={handleChange}>
        {Object.values(EntityType).map((type, i) => (<option key={i} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>))}
      </select>
      <br />
      <label htmlFor="positionX">Position X </label>
      <input ref={register({ valueAsNumber: true })} id="positionX" type="number" name="positionX" onChange={handleChange} />
      <br />
      <label htmlFor="positionY">Position Y </label>
      <input ref={register({ valueAsNumber: true })} id="positionY" type="number" name="positionY" onChange={handleChange} />
      <br />
      <label htmlFor="width">Width </label>
      <input ref={register({ valueAsNumber: true })} id="width" type="number" name="width" onChange={handleChange} />
      <br />
      <label htmlFor="height">Height </label>
      <input ref={register({ valueAsNumber: true })} id="height" type="number" name="height" onChange={handleChange} />
      <br />
    </form>
  );
}

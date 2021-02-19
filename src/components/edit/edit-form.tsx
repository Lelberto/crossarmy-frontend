import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { EntityType } from '../../types/configuration-types';

/**
 * Edit form values.
 */
export interface EditFormValues {
  type: EntityType;
}

/**
 * Edit form props.
 */
export interface EditFormProps {
  onSubmit?(values: EditFormValues): void;
}

/**
 * Edit form component.
 * 
 * @param onSubmit When the form is submitted 
 */
export const EditForm: FC<EditFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<EditFormValues>({
    defaultValues: { type: EntityType.BARBARIAN }
  });

  return (
    <form onSubmit={handleSubmit(values => onSubmit(values))}>
      <select ref={register} name="type">
        {Object.values(EntityType).map((type, i) => (<option key={i} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
}

import { FC, useState } from 'react';
import { ConfigEditForm, ConfigEditFormValues } from './config-edit-form';
import { BasicEditForm, BasicEditFormValues } from './basic-edit-form';

/**
 * Edit form values.
 */
export type EditFormValues = BasicEditFormValues & {
  config: ConfigEditFormValues;
}

/**
 * Edit form props.
 */
export type EditFormProps = {
  onSubmit?(values: EditFormValues): void;
}

/**
 * Edit form.
 * 
 * This form is used to create entities. It is separated to two parts :
 *   - The basic form part that manages the entity basic attributes like position and size
 *   - The configuration form part that manages the entity specific configuration
 * 
 * @param onSubmit When the form is submitted
 */
export const EditFormContainer: FC<EditFormProps> = ({ onSubmit }) => {
  const [basicValues, setBasicValues] = useState<BasicEditFormValues>(null);
  const [configValues, setConfigValues] = useState<ConfigEditFormValues>(null);

  return (
    <div>
      <BasicEditForm onSubmit={setBasicValues} />
      <ConfigEditForm type={basicValues?.type} onSubmit={setConfigValues} />
      <button onClick={() => onSubmit({...basicValues, config: {...configValues}})}>Create</button>
    </div>
  );
}

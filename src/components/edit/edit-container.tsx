import { FC, useContext, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import config from '../../util/config';
import { ArmyData } from '../../util/types/data-types';
import { CreationResponse } from '../../util/types/response-types';
import { Canvas } from '../canvas';
import { AuthenticationContext } from '../contexts/authentication-context';
import { EditFormContainer as EditForm, EditFormValues } from './edit-form';

/**
 * Edit container.
 */
export const EditContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const [army, setArmy] = useState<ArmyData>(null);
  const updateArmyQuery = useQuery<CreationResponse>();

  useEffect(() => {
    if (authUser) {
      setArmy(authUser.armies[0]);
    }
  }, [authUser]);

  const handleCreate = (values: EditFormValues) => {
    const entities = [...army.entities];
    entities.push({
      position: { x: values.positionX, y: values.positionY },
      size: { width: values.width, height: values.height },
      color: values.type === 'barbarian' ? '#0F0' : '#F00',
      config: values.config
    });
    setArmy(prev => ({ ...prev, entities }));
    updateArmyQuery.patch(`${config.api.url}/users/${authUser.id}/armies/${army.id}`, { entities });
  }

  return (
    <>
      <EditForm onSubmit={handleCreate} />
      {army && <Canvas army={army} width={army.size.width} height={army.size.height} />}
      {updateArmyQuery.status === Status.ERROR && updateArmyQuery.errorResponse.errors.map((error, i) => <p key={i}>{error.error_description}</p>)}
    </>
  );
}

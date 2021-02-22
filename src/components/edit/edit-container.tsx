import { FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { ArmyData } from '../../types/data-types';
import { CreationResponse, GetArmiesResponse } from '../../types/response-types';
import { Canvas } from '../canvas';
import { EditFormContainer as EditForm, EditFormValues } from './edit-form';

/**
 * Edit container.
 */
export const EditContainer: FC = () => {
  const [army, setArmy] = useState<ArmyData>(null);
  const armyQuery = useQuery<GetArmiesResponse>();
  const updateArmyQuery = useQuery<CreationResponse>();

  useEffect(() => {
    switch (armyQuery.status) {
      case Status.INIT:
        armyQuery.get(`http://localhost/users/602ebcb8be9e91334c4cbf18/armies`);
        break;
      case Status.SUCCESS:
        setArmy(armyQuery.response.armies[0]);
        break;
      default: break;
    }
  }, [armyQuery.status]);

  const handleCreate = (values: EditFormValues) => {
    const entities = [...army.entities];
    entities.push({
      position: { x: values.positionX, y: values.positionY },
      size: { width: values.width, height: values.height },
      color: values.type === 'barbarian' ? '#0F0' : '#F00',
      config: values.config
    });
    setArmy(prev => ({ ...prev, entities }));
    updateArmyQuery.patch(`http://localhost/users/602ebcb8be9e91334c4cbf18/armies/${army.id}`, { entities });
  }

  return (
    <>
      <EditForm onSubmit={handleCreate} />
      {army && <Canvas army={army} width={army.size.width} height={army.size.height} />}
      {updateArmyQuery.status === Status.ERROR && updateArmyQuery.errorResponse.errors.map((error, i) => <p key={i}>{error.error_description}</p>)}
    </>
  );
}

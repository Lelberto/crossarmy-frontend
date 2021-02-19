import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { BarbarianConfiguration } from '../../types/configuration-types';
import { ArmyData } from '../../types/data-types';
import { CreationResponse, GetArmiesResponse } from '../../types/response-types';
import { Canvas } from '../canvas';
import { EditForm, EditFormValues } from './edit-form';

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

  const handleEditFormSubmit = (values: EditFormValues) => {
    const entities = [...army.entities];
    entities.push({
      position: { x: _.random(0, army.size.width - 2), y: _.random(0, army.size.width - 2) },
      size: { width: 2, height: 2 },
      color: values.type === 'barbarian' ? '#0F0' : '#F00',
      config: {
        type: values.type,
        speed: _.random(0.8, 1.2),
        speedMultiplier: _.random(0.0, 0.2)
      } as BarbarianConfiguration
    });
    setArmy(prev => ({ ...prev, size: { width: prev.size.width + 1, height: prev.size.height }, entities }));
    updateArmyQuery.patch(`http://localhost/users/602ebcb8be9e91334c4cbf18/armies/${army.id}`, {
      entities
    });
  }

  return (
    <>
      <EditForm onSubmit={handleEditFormSubmit} />
      {army && <Canvas army={army} width={army.size.width} height={army.size.height} />}
    </>
  );
}

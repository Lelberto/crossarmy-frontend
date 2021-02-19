import { FC, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { ArmyData } from '../../types/data-types';
import { GetArmiesResponse } from '../../types/response-types';
import { Canvas } from '../canvas';

/**
 * Edit container.
 */
export const EditContainer: FC = () => {
  const [army, setArmy] = useState<ArmyData>(null);
  const armyQuery = useQuery<GetArmiesResponse>();

  useEffect(() => {
    switch (armyQuery.status) {
      case Status.INIT:
        armyQuery.get(`http://localhost/users/602ebcb8be9e91334c4cbf18/armies`);
        break;
      case Status.SUCCESS:
        setArmy(armyQuery.response.armies[0]);
        break;
      default:
        setArmy(null);
        break;
    }
  }, [armyQuery.status]);

  return (
    <>
      {army && <Canvas army={army} width={army.size.width} height={army.size.height} />}
    </>
  );
}

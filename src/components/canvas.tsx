import { FC, HTMLProps, useEffect, useRef } from 'react';
import { ArmyData } from '../types/data-types';

/**
 * Canvas props.
 */
export interface CanvasProps extends HTMLProps<HTMLCanvasElement> {
  army: ArmyData;
}

/**
 * Canvas component.
 * 
 * The canvas can draw an army.
 * 
 * @param army Army to draw 
 */
export const Canvas: FC<CanvasProps> = ({ army, ...rest }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (const entity of army.entities) {
        context.fillStyle = entity.color;
        context.fillRect(entity.position.x, entity.position.y, entity.size.width, entity.size.height);
      }
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [army]);

  return (
    <canvas ref={canvasRef} {...rest} />
  );
}
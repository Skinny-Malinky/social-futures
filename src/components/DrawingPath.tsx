import { getSvgPathFromStroke } from '../ruizUtils';
import getStroke from 'perfect-freehand';

export function DrawingPath(props: any) {
  return (
    <>
      {
        <path
          d={getSvgPathFromStroke(
            getStroke(props.pathItem, {
              size: 22,
              thinning: 0.5,
              smoothing: 0.5,
              streamline: 0.5
            })
          )}
        />
      }
    </>
  )}

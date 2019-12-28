import { HitPoint } from './hit-point';
import { Build } from './build';
import { Action } from './action';

export interface Hit {
  hitPoint: HitPoint;
  action: Action;
  build: Build;
}

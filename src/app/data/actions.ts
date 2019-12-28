import { Action, ActionImpl } from '../models/action';

export const Actions: Array<Action> = [
  new ActionImpl(
    'longsowrd', '气刃兜割（红）', 0.25, 0.3,
    function(b, h) {
      const rough =
            b.physicalRealAtk * h.physicalAbsorb * this.actionPower * 1.2;
      return Math.round(rough);
    }, undefined
  )
];

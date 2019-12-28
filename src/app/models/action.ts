import { Build } from './build';
import { HitPoint } from './hit-point';

type CalcFunc = (Build, HitPoint) => number;

export interface Action {
    weapon: string;
    name: string;
    actionPower: number;
    elementalRate: number;
    calcPhysicalDmg: CalcFunc;
    calcElementalDmg: CalcFunc;
}

export class ActionImpl implements Action {
    constructor(public weapon: string, public name: string,
                public actionPower: number, public elementalRate: number,
                public customCalcPhysicalDmg?: CalcFunc| undefined, public customCalcElementalDmg?: CalcFunc| undefined) {
                }

    calcPhysicalDmg(build: Build, hitPoint: HitPoint): number {
        if (this.customCalcPhysicalDmg) {
            return this.customCalcPhysicalDmg(build, hitPoint);
        }
        const rough =
            build.physicalRealAtk * hitPoint.physicalAbsorb * this.actionPower;
        return Math.round(rough);
    }
    calcElementalDmg(build: Build, hitPoint: HitPoint): number {
        if (this.customCalcElementalDmg) {
            return this.customCalcElementalDmg(build, hitPoint);
        }
        const rough =
            build.elementalRealAtk * hitPoint.elementalAbsorb * this.elementalRate;
        return Math.round(rough);
    }
}

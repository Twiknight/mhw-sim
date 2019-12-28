import { Sharpness } from './sharpness';

export interface Build {
  sharpness: Sharpness;
  weapon: string;
  attack: number;
  element: number;
  PhysicalCritPower: number;
  ElementalCritPower: number;
  physicalRealAtk: number;
  elementalRealAtk: number;
}

const elementSharpnessRate = {
  [Sharpness.WHITE]: 1.15,
  [Sharpness.PURPLE]: 1.25
};

const physicalSharpnessRate = {
  [Sharpness.WHITE]: 1.32,
  [Sharpness.PURPLE]: 1.39
};

export class BuildImpl implements Build {
  constructor(
    public sharpness: Sharpness,
    public weapon: string,
    public attack: number,
    public element: number,
    public PhysicalCritPower: number,
    public ElementalCritPower: number,
  ) {}

  public get physicalRealAtk(): number {
    return physicalSharpnessRate[this.sharpness] * this.attack * this.PhysicalCritPower;
  }
  public get elementalRealAtk(): number {
    return elementSharpnessRate[this.sharpness] * Math.round(this.element * this.ElementalCritPower);
  }


}


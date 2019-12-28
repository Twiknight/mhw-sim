import { Component } from '@angular/core';
import { Hit } from './models/hit';
import { HitPoint } from './models/hit-point';
import { BuildImpl, Build } from './models/build';
import { Sharpness } from './models/sharpness';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActionImpl, Action } from './models/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  sharps = [
    Sharpness.WHITE, Sharpness.PURPLE
  ];
  critPowers = [
    1.2, 1.25, 1.3, 1.4
  ];
  elementalCritPowers = [
    1, 1.35, 1.55
  ];
  title = 'mhw-sim';

  // Build info
  buildForm = this.fb.group({
    attack: [257],
    element: [210],
    sharpness: [Sharpness.WHITE],
    critPower: [1.4],
    elementCritPower: [1]
  });

  // Moster info
  monsterForm = this.fb.group({
    elementAbsorb: [30],
    physicalAbsorb: [80]
  });

  // Action Info
  actionForm = this.fb.group({
    physcialPower: [30],
    elementalPower: [0.3]
  });

  build: Build = new BuildImpl(
    Sharpness.WHITE, '', 257, 21, 1.4, 1
  );
  target: HitPoint = {
    monster: 'any',
    part: 'any',
    elementalAbsorb: 0.3,
    physicalAbsorb: 0.8,
  };
  action: Action = new ActionImpl('', '', 0.3, 0.3);

  constructor(private fb: FormBuilder) {
    this.initBuildForm();
    this.initMonsterForm();
    this.initActionForm();
  }

  initBuildForm(): void {
    this.buildForm.valueChanges.subscribe((value) => {
      this.build.sharpness = value.sharpness;
      this.build.attack = value.attack;
      this.build.element = value.element / 10;
      this.build.PhysicalCritPower = value.critPower;
      this.build.ElementalCritPower = value.elementCritPower;
    });
  }

  initMonsterForm(): void {
    this.monsterForm.valueChanges.subscribe((value) => {
      this.target.elementalAbsorb = value.elementAbsorb / 100;
      this.target.physicalAbsorb = value.physicalAbsorb / 100;
    });
  }

  initActionForm(): void {
    this.actionForm.valueChanges.subscribe((value) => {
      this.action.actionPower = value.physcialPower / 100;
      this.action.elementalRate = value.elementalPower;
    });
  }

  public get physicalDamage() {
    return this.action.calcPhysicalDmg(this.build, this.target);
  }

  public get elementalDamage() {
    return this.action.calcElementalDmg(this.build, this.target);
  }

  public get damage() {
    return this.physicalDamage + this.elementalDamage;
  }
}

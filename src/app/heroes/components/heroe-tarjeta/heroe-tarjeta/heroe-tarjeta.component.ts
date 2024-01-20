import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
    button {
      margin-right: 10px;
    }
  `
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input('heroe') heroe!: Heroe;

  constructor() { }

  ngOnInit(): void { 

    if (!this.heroe) throw Error('Hero property is required');

  }

}

import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  hayError: boolean = false;
  heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
    this.hayError = false;
    this.heroesService.getHeroes()
      .subscribe({
        next: ( heroes ) => {
          if( heroes.length == undefined ) {
            this.hayError = true
          }
          this.heroes = heroes;
        },
        error: ( err ) => {
          this.hayError = true;
          this.heroes   = [];
        }
      });

  }

}

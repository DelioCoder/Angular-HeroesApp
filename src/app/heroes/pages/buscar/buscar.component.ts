import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  selectedHeroe: Heroe | undefined;

  public searchInput = new FormControl('');

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  searchHero()
  {
      const value: string = this.searchInput.value || '';

      this.heroesService.getSugerencias(value)
        .subscribe( heroes => this.heroes = heroes );
  } 

  onSelectedOption( e: MatAutocompleteSelectedEvent )
  {
    
    if ( !e.option.value )
    {

      this.selectedHeroe = undefined;

      return;
    }

    const hero: Heroe = e.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHeroe = hero;

  }

}

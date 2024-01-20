import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 6px
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe?  : Heroe;
  hayError: boolean = false;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private heroeService  : HeroesService,
    private router        : Router
  ) { }

  ngOnInit(): void {
    this.hayError = false;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroeService.getHeroePorId( id ) ),
        tap( console.log )
      )
      .subscribe(heroe =>{
          if(!heroe) return this.router.navigate([ '/heroes/listado' ]);

          this.heroe = heroe;

          return;
      })
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}

import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%
    }
  `]
})

export class AgregarComponent implements OnInit {
  
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl(''),
    publisher: new FormControl(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

    get currentHero(): Heroe {
      
      const heroe = this.heroForm.value as Heroe;
      
      return heroe;
    }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId( id )),
      ).subscribe( heroe => {

        if ( !heroe ) return this.router.navigateByUrl('/');

        this.heroForm.reset( heroe );
        
        return;

      })
  }

  onSubmit(): void
  {
    if (this.heroForm.invalid) return; 
    
    if (this.currentHero.id)
    {
      this.heroesService.actualizarHeroe( this.currentHero )
        .subscribe( heroe => {
          this.mostrarSnackbar(`${ heroe.superhero } actualizado!`);
        } );

        return;
    }

    this.heroesService.agregarHeroe( this.currentHero )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar(`${ heroe.superhero } registrado!`);
      });

  }

  deleteHeroe(): void
  {

    if ( !this.currentHero.id ) throw new Error('El id del héroe es necesario!');

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.currentHero
    });

    dialog.afterClosed()
      .pipe(
        filter(( result: boolean ) => result),
        switchMap(() => this.heroesService.borrarHeroe( this.currentHero.id! )),
        filter((wasDeleted: boolean ) => wasDeleted),
      )
      .subscribe( result => {
          this.router.navigate(['/heroes/listado']);
      });
  }

  mostrarSnackbar(mensaje: string) {

    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}

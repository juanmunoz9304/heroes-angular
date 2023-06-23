import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  constructor(private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/')
      this.heroForm.reset(hero);
      return;
    })
  }

  public publishers = [
    {
      id: 'DC Comics',
      value: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      value: 'Marvel - Comics'
    },
  ];

  public get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public onSubmit(): void {
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackBar(`${hero.superhero} updated!`)
      })
      return;
    }
    this.heroService.addHero(this.currentHero).subscribe(hero => {
      this.showSnackBar(`${hero.superhero} Created!`);
      this.router.navigateByUrl('/');
    })
  }

  public onDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Id is required!');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result : boolean) => result),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted : boolean) => wasDeleted)
      ).subscribe(
        () => this.router.navigateByUrl('/')
      )


    // .subscribe(result => {

    // if(!result) return;
    // this.heroService.deleteHeroById(this.currentHero.id).subscribe(val => {
    //   if(val) 
    // });


    // });
  }

  public showSnackBar(message: string) {
    this.snackBar.open(message, 'done', {
      duration: 2500
    });
  }


}

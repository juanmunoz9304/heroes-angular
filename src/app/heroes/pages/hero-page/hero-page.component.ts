import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  public hero? : Hero;
  
  constructor(
    private heroService : HeroesService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if(!hero) this.router.navigate(['/heroes/list'])
      this.hero = hero;
    })
  }

  goBack () : void {
    this.router.navigateByUrl('/heroes/list')
  }


}

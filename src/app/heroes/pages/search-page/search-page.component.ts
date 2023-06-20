import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  constructor(private heroesService : HeroesService, 
    private router : Router
  ){}

  public searchInput = new FormControl('');

  public heroes : Hero[] = [];

  public searchHero () : void {
    const value : string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value)
    .subscribe(heroes => this.heroes = heroes);
  }

  public onSelectedOption (event : MatAutocompleteSelectedEvent ) : void {
    if(event) this.router.navigate([`/heroes/${event.option.value.id}`])
  }
}

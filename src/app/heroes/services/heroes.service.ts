import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/enviroments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl : string = environments.baseUrl;
  constructor(private httpClient: HttpClient) { }
  

  public getHeroes () : Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }


  public getHeroById (id: string) : Observable<Hero | undefined> {
    return this.httpClient.get<Hero | undefined>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(e => of(undefined))
    )
  }

  public getSuggestions (query : string) : Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`)
  }

  public addHero (hero : Hero) : Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  public updateHero (hero : Hero) : Observable<Hero> {
    if(!hero.id) throw Error('Hero id is required')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteHeroById (id: string) : Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(res => true),
      catchError(e => of(false)),
    );
  }
}
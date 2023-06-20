import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
}
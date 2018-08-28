import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HerosServiceService {
  private readonly URL = 'http://localhost:8080/api/heros';

  constructor(protected http: HttpClient) {}

  public create(hero: Hero): Observable<Hero> {
    return this.http.post(this.URL, hero).map(this.extractObject);
  }

  private extractObject(res: Response): Object {
    const data: any = res.json();
    return data || {};
  }
}

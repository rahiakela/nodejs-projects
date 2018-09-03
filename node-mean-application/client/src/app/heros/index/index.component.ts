import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getHeros } from '../../app.reducers';
import { Hero } from '../../models/hero';
import * as HeroActions from '../heros.actions';
import { State } from '../heros.reducers';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public heros: Observable<Array<Hero>>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.heros = this.store$.pipe(select(getHeros));
    this.store$.dispatch(new HeroActions.LoadHerosAction());
  }
}

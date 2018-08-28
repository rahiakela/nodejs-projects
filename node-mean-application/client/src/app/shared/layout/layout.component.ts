import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getShowSidenav, State } from '../../app.reducers';
import * as RouterActions from '../router-actions';
import { OpenSidenavAction } from '../shared.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public open: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.open = this.store.select(getShowSidenav);
  }

  public add() {}

  public heros() {
    this.store.dispatch(new RouterActions.Go({ path: ['/heros'] }));
  }

  public openSidenav() {
    this.store.dispatch(new OpenSidenavAction());
  }
}

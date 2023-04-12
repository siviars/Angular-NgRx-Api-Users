import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/store/user.interface';
import { getUsers } from 'src/app/store/users.actions';
import { selectError, selectIsLoading, selectUsers } from 'src/app/store/users.selector';
import { UsersService } from 'src/app/store/users.service';
import { UsersPostsStateInterface } from 'src/app/store/usersPostsState.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  selector = 'html'

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  users$: Observable<User[]>;

  constructor(private store: Store<UsersPostsStateInterface>, private usersService: UsersService) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading))
    this.error$ = this.store.pipe(select(selectError))
    this.users$ = this.store.pipe(select(selectUsers))
  }
  ngOnInit() {
    this.store.dispatch(getUsers());
  }




}

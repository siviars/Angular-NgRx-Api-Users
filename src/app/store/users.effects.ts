import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addUser, addUserFailure, addUserSucces, getUsers, getUsersFailure, getUsersSucces, removeUser, removeUserFailure, removeUserSucces, updateUser, updateUserFailure, updateUserSucces } from './users.actions';
import { exhaustMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from 'src/app/store/users.service';
import { User } from 'src/app/store/user.interface';


@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions, private usersService: UsersService) { }

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsers),
            mergeMap(() => {
                return this.usersService.getServiceUsers().pipe(
                    map((users: User[]) => getUsersSucces({ users })),
                    catchError(error =>
                        of(getUsersFailure({ error: error.message })))
                )
            })
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            exhaustMap(action => {
                return this.usersService.addServiceUser(action.user).pipe(
                    map((user: User) => addUserSucces({ user })),
                    catchError(error =>
                        of(addUserFailure({ error: error.message })))
                )
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            exhaustMap(action => {
                return this.usersService.updateServiceUser(action.user).pipe(
                    map((user: User) => updateUserSucces({ user })),
                    catchError(error =>
                        of(updateUserFailure({ error: error.message })))
                )
            })
        )
    );

    removeUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeUser),
            exhaustMap(action => {
                return this.usersService.removeServiceUser(action.id).pipe(
                    map((id: number) => removeUserSucces({ id })),
                    catchError(error =>
                        of(removeUserFailure({ error: error.message })))
                )
            })
        )
    );

}

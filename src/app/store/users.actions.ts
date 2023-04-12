import { createAction, props } from "@ngrx/store";
import { User } from "src/app/store/user.interface";

export const addUser = createAction(
    '[Users] Add User',
    props<{ user: User }>()
);

export const addUserSucces = createAction(
    '[Users] Add User Succes',
    props<{ user: User }>()
);

export const addUserFailure = createAction(
    '[Users] Add User Failure',
    props<{ error: string }>()
);

export const updateUser = createAction(
    '[Users] Update User',
    props<{ user: User }>()
);

export const updateUserSucces = createAction(
    '[Users] Update User Succes',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[Users] Update User Failure',
    props<{ error: string }>()
);

export const removeUser = createAction(
    '[Users] Remove User',
    props<{ id: number }>()
);

export const removeUserSucces = createAction(
    '[Users] Remove User Succes',
    props<{ id: number }>()
);

export const removeUserFailure = createAction(
    '[Users] Remove User Failure',
    props<{ error: string }>()
);

export const getUsers = createAction(
    '[Users] Get Users'
);

export const getUsersSucces = createAction(
    '[Users] Get Users Succes',
    props<{ users: User[] }>()
);

export const getUsersFailure = createAction(
    '[Users] Get Users Failure',
    props<{ error: string }>()
);


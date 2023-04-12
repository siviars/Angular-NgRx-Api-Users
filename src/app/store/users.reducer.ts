import { createReducer, on } from '@ngrx/store';
import { getUsers, getUsersSucces, getUsersFailure, addUser, addUserSucces, addUserFailure, removeUser, removeUserSucces, removeUserFailure, updateUser, updateUserSucces, updateUserFailure } from 'src/app/store/users.actions';

import { UsersPostsStateInterface } from 'src/app/store/usersPostsState.interface';


export const initialState: UsersPostsStateInterface = {
    isLoading: false,
    users: [],
    error: null,
}

export const usersReducer = createReducer(
    initialState,
    on(getUsers, addUser, updateUser, removeUser, (state: UsersPostsStateInterface) => ({
        ...state,
        isLoading: true
    })),
    on(getUsersSucces, (state: UsersPostsStateInterface, { users }) => ({
        ...state,
        isLoading: false,
        users: users
    })),
    on(getUsersFailure, addUserFailure, updateUserFailure, removeUserFailure, (state: UsersPostsStateInterface, { error }) => ({
        ...state,
        error: error
    })),
    on(addUserSucces, (state: UsersPostsStateInterface, { user }) => ({
        ...state,
        isLoading: false,
        users: [user, ...state.users]
    })),
    on(updateUserSucces, (state: UsersPostsStateInterface, { user }) => ({
        ...state,
        isLoading: false,
        users: state.users.map(listUser => {
            if (listUser.id === user.id) {
                listUser = user;
            }
            return listUser;
        })
    })),
    on(removeUserSucces, (state: UsersPostsStateInterface, { id }) => ({
        ...state,
        isLoading: false,
        users: state.users.filter(users => users.id !== id)
    })),

);

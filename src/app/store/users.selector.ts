
import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import {  usersReducer } from 'src/app/store/users.reducer';
import { UsersPostsStateInterface } from 'src/app/store/usersPostsState.interface';


// export const selectFeature = createFeatureSelector<UsersPostsStateInterface>('employeeFeature');

// export const selectIsLoading = createSelector(
//     selectFeature,
//     (state:UsersPostsStateInterface) => state.isLoading
// )

// export const selectEmployees = createSelector(
//     selectFeature,
//     (state:UsersPostsStateInterface) => state.employees
// )

// export const selectError = createSelector(
//     selectFeature,
//     (state:UsersPostsStateInterface) => state.error
// )


export const usersFeature = createFeature({ name: 'users', reducer: usersReducer })
export const { selectUsers, selectError, selectIsLoading } = usersFeature

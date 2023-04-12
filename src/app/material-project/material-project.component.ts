import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/store/user.interface';
import { addUser, removeUser, updateUser } from 'src/app/store/users.actions';
import { UsersPostsStateInterface } from 'src/app/store/usersPostsState.interface';


@Component({
  selector: 'app-material-project',
  templateUrl: 'material-project.component.html',
  styleUrls: ['material-project.component.scss']
})

export class MaterialProjectComponent implements OnInit, AfterViewInit {

  updateId!: string;
  userForm!: FormGroup;

  @ViewChild('add') addButton!: MatButton;
  @ViewChild('update') updateButton!: MatButton;
  @ViewChild('cancel') cancelButton!: MatButton;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  users$: Observable<User[]>;

  displayedColumns: string[] = ['id', 'name', 'birth', 'email', 'gender', 'status', 'comment', 'update', 'action'];
  dataSource = new MatTableDataSource<User>();

  constructor(private appComponent: AppComponent, private store: Store<UsersPostsStateInterface>) {
    this.isLoading$ = this.appComponent.isLoading$;
    this.error$ = this.appComponent.error$;
    this.users$ = this.appComponent.users$;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.users$.subscribe((object: User[]) => this.dataSource.data = object);

    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      userBirth: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      userEmail: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.email]),
      userGender: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      userStatus: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      userComment: new FormControl('', [Validators.maxLength(250)]),
    });
  }

  userError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  addUser(newName: string, newBirth: string, newEmail: string, newGender: string, newStatus: string, newComment: string) {
    if (this.userForm.valid) {
      const newUser: User = { id: 0, name: newName, birth: new Date(newBirth), email: newEmail, gender: newGender, status: newStatus, comment: newComment, update: new Date }
      this.store.dispatch(addUser({ user: newUser }));
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  updateUser(id: string, updateName: string, updateBirth: string, updateEmail: string, updateGender: string, updateStatus: string, updateComment: string) {
    if (this.userForm.valid) {
      const updatedUser: User = { id: Number(id), name: updateName, birth: new Date(updateBirth), email: updateEmail, gender: updateGender, status: updateStatus, comment: updateComment, update: new Date() }
      this.store.dispatch(updateUser({ user: updatedUser }));
      this.cancelFields();
    } else {
      this.userForm.markAllAsTouched();
    }

  }

  removeUser(id: string) {
    this.store.dispatch(removeUser({ id: Number(id) }));
  }

  readUser(id: string) {
    this.addButton.disabled = true;
    this.updateButton.disabled = false;
    this.updateId = id;
    this.cancelButton.disabled = false;
    this.users$.subscribe((list: User[]) => list.map((user: User) => {
      if (user.id == Number(id)) {
        this.userForm.patchValue({
          userName: user.name,
          userBirth: user.birth,
          userEmail: user.email,
          userGender: user.gender,
          userStatus: user.status,
          userComment: user.comment,
        });
      }
    }))
  }

  cancelFields() {
    this.cancelButton.disabled = true;
    this.addButton.disabled = false;
    this.updateButton.disabled = true;
    this.userForm.reset();
  }

}

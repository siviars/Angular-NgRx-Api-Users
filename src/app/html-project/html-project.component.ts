import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/store/user.interface';
import { addUser, removeUser, updateUser } from 'src/app/store/users.actions';
import { UsersPostsStateInterface } from 'src/app/store/usersPostsState.interface';

@Component({
  selector: 'app-html-project',
  templateUrl: 'html-project.component.html',
  styleUrls: ['html-project.component.scss']
})
export class HtmlProjectComponent implements OnInit {

  @ViewChild('name') nameValue!: ElementRef;
  @ViewChild('birth') birthValue!: ElementRef;
  @ViewChild('email') emailValue!: ElementRef;
  @ViewChild('gender') genderValue!: ElementRef;
  @ViewChild('status') statusValue!: ElementRef;
  @ViewChild('comment') commentValue!: ElementRef;
  @ViewChild('add') addButton!: ElementRef;
  @ViewChild('update') updateButton!: ElementRef;
  @ViewChild('cancel') cancelButton!: ElementRef;
  updateId!: number;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  users$: Observable<User[]>;

  constructor(private appComponent: AppComponent, private store: Store<UsersPostsStateInterface>) {
    this.isLoading$ = this.appComponent.isLoading$;
    this.error$ = this.appComponent.error$;
    this.users$ = this.appComponent.users$
  }
  ngOnInit() {

  }

  addUser(newName: string, newBirth: string, newEmail: string, newGender: string, newStatus: string, newComment: string) {
    const newUser: User = { id: 0, name: newName, birth: new Date(newBirth), email: newEmail, gender: newGender, status: newStatus, comment: newComment, update: new Date() }
    this.store.dispatch(addUser({ user: newUser }));
  }

  removeUser(id: number) {
    this.store.dispatch(removeUser({ id: Number(id) }));
  }

  updateUser(id: number, updateName: string, updateBirth: string, updateEmail: string, updateGender: string, updateStatus: string, updateComment: string) {
    const updatedUser: User = { id: id, name: updateName, birth: new Date(updateBirth), email: updateEmail, gender: updateGender, status: updateStatus, comment: updateComment, update: new Date() }
    this.store.dispatch(updateUser({ user: updatedUser }));
    this.cancelFields();
  }

  readUser(id: number) {
    this.addButton.nativeElement.disabled = true;
    this.updateButton.nativeElement.disabled = false;
    this.updateId = id;
    this.cancelButton.nativeElement.disabled = false;
    this.users$.subscribe((list:User[]) => list.map((user: User) => {
      if (user.id == id) {
        this.nameValue.nativeElement.value = user.name;
        this.birthValue.nativeElement.value = user.birth;
        this.emailValue.nativeElement.value = user.email;
        this.genderValue.nativeElement.value = user.gender;
        this.statusValue.nativeElement.value = user.status;
        this.commentValue.nativeElement.value = user.comment;
      }
    })
    )
  }

  cancelFields() {
    this.cancelButton.nativeElement.disabled = true;
    this.addButton.nativeElement.disabled = false;
    this.updateButton.nativeElement.disabled = true;
    this.nameValue.nativeElement.value = '';
    this.birthValue.nativeElement.value = '';
    this.emailValue.nativeElement.value = '';
    this.genderValue.nativeElement.value = 'male';
    this.statusValue.nativeElement.value = 'active';
    this.commentValue.nativeElement.value = 'Leave a comment...';
  }


}

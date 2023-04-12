import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { User } from 'src/app/store/user.interface';

interface usersResponse {
  data: User[]
}

interface newUserResponse {
  data: User
}

@Injectable({ providedIn: 'root' })
export class UsersService {

  private url: string = 'https://gorest.co.in/public-api/users/';

  constructor(@Inject('API_TOKEN') private ApiToken: String, private http: HttpClient) { }

  getServiceUsers(): Observable<User[]> {
    const getUrl: string = this.url + this.ApiToken;
    return this.http.get<usersResponse>(getUrl).pipe(map((object: usersResponse) => object.data));
  }

  addServiceUser(newUser: User) {
    const postUrl: string = this.url + this.ApiToken;
    return this.http.post<newUserResponse>(postUrl, newUser).pipe(map((object: newUserResponse) => {
      object.data.comment = newUser.comment;
      object.data.birth = newUser.birth;
      object.data.update = newUser.update;
      return object.data;
    }))
  }

  updateServiceUser(updateUser: User) {
    const putUrl: string = this.url + updateUser.id + this.ApiToken;
    return this.http.put<newUserResponse>(putUrl, updateUser).pipe(map((object: newUserResponse) => {
      object.data.comment = updateUser.comment;
      object.data.birth = updateUser.birth;
      object.data.update = updateUser.update;
      return object.data;
    }))
  }

  removeServiceUser(id: number) {
    const deleteUrl: string = this.url + String(id) + '/' + this.ApiToken;
    return this.http.delete(deleteUrl).pipe(map(() => { return id }))
  }

}

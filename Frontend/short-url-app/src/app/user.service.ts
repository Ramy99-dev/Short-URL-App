import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) {}

  login(user:User):Observable<any>
  {
    return this._httpClient.post('http://localhost:8000/login',user);
  }
  addUser(user:User):Observable<any>
  {
    return this._httpClient.post('http://localhost:8000/add-user',user);
  }
  activateAccount(email:String):Observable<any>
  {
    return this._httpClient.put('http://localhost:8000/update-account?email='+email,{});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './shared/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
};

  baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/getUsers/`);
  }
  getUsersByID(id:number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/getUserByID/${id}`);
  }

  getUsersByEmail(Email:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/getUserByEmail/${Email}`);
  }

  createUsersByEmail(email:string, firstName:string, lastName:string, pass:string, phoneNumber:string):Observable<User>{
    
    return this.http.post<User>(`${this.baseUrl}/createUser` ,{
      "email" : `${email}`, 
      "first_name": `${firstName}`, 
      "last_name": `${lastName}`, 
      "user_password": `${pass}`, 
      "phone": `${phoneNumber}`
  });
  }
}

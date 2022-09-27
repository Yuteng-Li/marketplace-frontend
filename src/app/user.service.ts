import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}/getUsers/`);
  }
  getUsersByID(id:number){
    return this.http.get<any>(`${this.baseUrl}/getUserByID/${id}`);
  }

  getUsersByEmail(Email:string){
    return this.http.get<any>(`${this.baseUrl}/getUserByEmail/${Email}`);
  }

  createUsersByEmail(email:string, firstName:string, lastName:string, pass:string, phoneNumber:string){
    
    return this.http.post<any>(`${this.baseUrl}/createUser` ,{
      "user_id": 0,
      "email" : `${email}`, 
      "first_name": `${firstName}`, 
      "last_name": `${lastName}`, 
      "user_password": `${pass}`, 
      "phone": `${phoneNumber}`
  });
  }
}

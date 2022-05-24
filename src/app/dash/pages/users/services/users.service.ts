import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api_base = `${environment.api_gts}users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.api_base}`);
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.api_base}/${id}`);
  }
}

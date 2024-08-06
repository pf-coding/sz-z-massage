import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://sz-z-massage-backend-server.onrender.com/users';
  constructor(private http: HttpClient) {}

  // Adminok lekérdezése
  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Admin törlése
  deleteAdmin(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uid}`);
  }
}

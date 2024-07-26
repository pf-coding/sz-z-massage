import { Injectable } from '@angular/core';
import {
  DocumentData,
  addDoc,
  collection,
  Firestore,
  getDocs,
  doc,
  docData,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersCollectionRef = collection(this.firestore, 'users');

  constructor(private firestore: Firestore) {}

  addUser(user: UserModel): Observable<DocumentData> {
    return from(addDoc(this.usersCollectionRef, user));
  }

  getUsersWithGetDoc(): Observable<UserModel[]> {
    return from(getDocs(this.usersCollectionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const userData: UserModel = doc.data() as UserModel;
          userData.id = doc.id;
          if (userData.timestamp) {
            const timestampDate = this.convertTimestamp(userData.timestamp);
            userData.timestampDate = timestampDate;
            userData.year = timestampDate.getFullYear();
            userData.month = timestampDate.getMonth() + 1; // Months are zero-indexed
            userData.day = timestampDate.getDate();
            userData.hour = timestampDate.getHours();
            userData.minute = timestampDate.getMinutes();
            userData.second = timestampDate.getSeconds();
          }
          return userData;
        });
        return resultList;
      })
    );
  }

  getUser(id: string): Observable<UserModel> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<UserModel>;
  }

  updateUser(user: UserModel): Observable<void> {
    const userDoc = doc(this.firestore, `users/${user.id}`);
    return from(setDoc(userDoc, user));
  }

  deleteUser(id: string): Observable<void> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return from(deleteDoc(userDoc));
  }

  private convertTimestamp(timestamp: {
    seconds: number;
    nanoseconds: number;
  }): Date {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
}

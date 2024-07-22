// import { Injectable } from '@angular/core';
// import {
//   DocumentData,
//   addDoc,
//   collection,
//   Firestore,
//   getDocs,
//   doc,
//   docData,
//   setDoc,
//   deleteDoc,
// } from '@angular/fire/firestore';
// import { UserModel } from '../models/user.model';
// import { Observable, from, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private readonly usersCollectionRef = collection(this.firestore, 'users');

//   constructor(private firestore: Firestore) {}

//   addUser(user: UserModel): Observable<DocumentData> {
//     return from(addDoc(this.usersCollectionRef, user));
//   }

//   getUsersWithGetDoc(): Observable<UserModel[]> {
//     return from(getDocs(this.usersCollectionRef)).pipe(
//       map((snapshot) => {
//         const resultList = snapshot.docs.map((doc) => {
//           const userData: UserModel = doc.data() as UserModel;
//           userData.id = doc.id;
//           return userData;
//         });
//         return resultList;
//       })
//     );
//   }

//   getUser(id: string): Observable<UserModel> {
//     const userDoc = doc(this.firestore, `users/${id}`);
//     return docData(userDoc, { idField: 'id' }) as Observable<UserModel>;
//   }

//   updateUser(movie: UserModel): Observable<void> {
//     const userDoc = doc(this.firestore, `users/${movie.id}`);
//     return from(setDoc(userDoc, movie));
//   }

//   deleteUser(id: string): Observable<void> {
//     const userDoc = doc(this.firestore, `users/${id}`);
//     return from(deleteDoc(userDoc));
//   }
// }

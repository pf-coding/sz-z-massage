// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {
//   AbstractControl,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { UserModel } from 'src/app/models/user.model';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-reg-form',
//   templateUrl: './reg-form.component.html',
//   styleUrls: ['./reg-form.component.scss'],
// })
// export class RegFormComponent implements OnInit, OnDestroy {
//   userForm!: FormGroup;
//   id?: string;
//   user?: UserModel;
//   subUser?: Subscription;
//   subRoute?: Subscription;

//   get name(): AbstractControl | null {
//     return this.userForm.get('name');
//   }
//   get email(): AbstractControl | null {
//     return this.userForm.get('email');
//   }

//   submitUserForm() {
//     if (!this.userForm.invalid) {
//       const newUser: UserModel = this.userForm.value;

//       if (this.id) {
//         newUser.id = this.id;
//         this.userService.updateUser(newUser).subscribe({
//           complete: () => {
//             this.router.navigate(['users']);
//           },
//         });
//       } else {
//         this.userService.addUser(newUser).subscribe({
//           next: (docRef) => {
//             console.log('User saved with ID: ', docRef['id']);
//           },
//           error: (err) => {
//             console.log(err);
//           },
//         });
//         alert('Form Submitted!');
//         this.userForm.reset();
//       }
//     }
//   }

//   deleteUserFromList(id?: string): void {
//     if (id && confirm(`Are you sure to delete this user from the list?`)) {
//       this.userService.deleteUser(id).subscribe({
//         complete: () => {
//           this.router.navigate(['users']);
//         },
//       });
//     }
//   }

//   constructor(
//     private userService: UserService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.userForm = new FormGroup({
//       name: new FormControl('', [
//         Validators.required,
//         Validators.minLength(1),
//         Validators.maxLength(30),
//       ]),
//       email: new FormControl('', [
//         Validators.required,
//         Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
//       ]),
//     });

//     this.subRoute = this.activatedRoute.paramMap.subscribe((params) => {
//       let readParam = params.get('id');
//       if (readParam) {
//         this.id = readParam;
//         this.subUser = this.userService.getUser(this.id).subscribe({
//           next: (user: UserModel) => {
//             this.user = user;
//             this.userForm.patchValue(user);
//           },
//         });
//       }
//     });
//   }
//   ngOnDestroy(): void {
//     this.subUser?.unsubscribe();
//     this.subRoute?.unsubscribe();
//   }
// }

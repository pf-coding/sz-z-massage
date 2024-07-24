import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss'],
})
export class RegFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  id?: string;
  user?: UserModel;
  subUser?: Subscription;
  subRoute?: Subscription;

  get name(): AbstractControl | null {
    return this.userForm.get('name');
  }
  get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  submitUserForm() {
    console.log('Form submitted'); // Added for debugging
    if (!this.userForm.invalid) {
      const newUser: UserModel = this.userForm.value;

      if (this.id) {
        newUser.id = this.id;
        this.userService.updateUser(newUser).subscribe({
          complete: () => {
            this.router.navigate(['users']);
          },
          error: (err) => {
            console.error('Error updating user:', err);
            alert(
              'An error occurred while updating the user. Please try again.'
            );
          },
        });
      } else {
        this.userService.getUsersWithGetDoc().subscribe({
          next: (users: UserModel[]) => {
            const userWithEmail = users.find((u) => u.email === newUser.email);
            if (userWithEmail) {
              alert(
                'This email address is already in use. Please use a different email.'
              );
            } else {
              this.userService.addUser(newUser).subscribe({
                next: (docRef) => {
                  console.log('User saved with ID: ', docRef['id']);
                  alert('User added successfully!');
                  this.userForm.reset();
                },
                error: (err) => {
                  console.error('Error adding user:', err);
                  alert(
                    'An error occurred while adding the user. Please try again.'
                  );
                },
              });
            }
          },
          error: (err) => {
            console.error('Error fetching users:', err);
            alert(
              'An error occurred while validating the email. Please try again.'
            );
          },
        });
      }
    }
  }

  deleteUserFromList(id?: string): void {
    if (id && confirm(`Are you sure to delete this user from the list?`)) {
      this.userService.deleteUser(id).subscribe({
        complete: () => {
          this.router.navigate(['users']);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('An error occurred while deleting the user. Please try again.');
        },
      });
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
    });

    this.subRoute = this.activatedRoute.paramMap.subscribe((params) => {
      let readParam = params.get('id');
      if (readParam) {
        this.id = readParam;

        // Használja a getUsersWithGetDoc metódust
        this.subUser = this.userService.getUsersWithGetDoc().subscribe({
          next: (users: UserModel[]) => {
            // Szűri a felhasználók listájából a megfelelő ID-hez tartozó felhasználót
            const user = users.find((u) => u.id === this.id);
            if (user) {
              this.user = user;
              console.log('Fetched user:', this.user); // Debugging célra
              this.userForm.patchValue(user);
            } else {
              console.error(`User with ID ${this.id} not found`);
            }
          },
          error: (err) => {
            console.error('Error fetching users:', err);
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subUser?.unsubscribe();
    this.subRoute?.unsubscribe();
  }
}

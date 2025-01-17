import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
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
import { AuthService } from 'src/app/services/auth-service.service';
import { TranslationService } from '@app/services/translation.service';

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
  isLoggedIn: boolean | null = null;
  private authSubscription: Subscription | null = null;
  privacyPolicyText!: string;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  get name(): AbstractControl | null {
    return this.userForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  submitUserForm() {
    console.log('Form submitted');
    if (!this.userForm.invalid) {
      const newUser: UserModel = this.userForm.value;

      if (this.id) {
        // Update operation
        if (!this.isLoggedIn) {
          alert('You must be logged in to update a user.');
          return;
        }

        this.userService.getUsersWithGetDoc().subscribe({
          next: (users: UserModel[]) => {
            const existingUser = users.find((u) => u.id === this.id);
            if (existingUser) {
              newUser.timestamp = existingUser.timestamp;
              newUser.id = this.id;

              this.userService.updateUser(newUser).subscribe({
                complete: () => {
                  this.router.navigate(['users']);
                  this.closeModal.emit();
                },
                error: (err) => {
                  console.error('Error updating user:', err);
                  alert(
                    'An error occurred while updating the user. Please try again.'
                  );
                },
              });
            } else {
              alert('User not found.');
            }
          },
          error: (err) => {
            console.error('Error fetching users:', err);
            alert('An error occurred while fetching users. Please try again.');
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
              newUser.timestamp = this.dateToFirestoreTimestamp(new Date());
              this.userService.addUser(newUser).subscribe({
                next: (docRef) => {
                  console.log('User saved with ID: ', docRef['id']);
                  this.userForm.reset();
                  this.closeModal.emit();
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

  dateToFirestoreTimestamp(date: Date): {
    seconds: number;
    nanoseconds: number;
  } {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = (date.getTime() % 1000) * 1000000;
    return { seconds, nanoseconds };
  }

  deleteUserFromList(id?: string): void {
    if (id && confirm(`Are you sure to delete this user from the list?`)) {
      this.userService.deleteUser(id).subscribe({
        complete: () => {
          this.router.navigate(['users']);
          this.closeModal.emit();
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
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public translationService: TranslationService
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
      dataConsent: new FormControl(false, [Validators.requiredTrue]),
    });

    // AuthService subscription az bejelentkezett állapot figyelésére
    this.authSubscription = this.authService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );

    this.subRoute = this.activatedRoute.paramMap.subscribe((params) => {
      let readParam = params.get('id');
      if (readParam) {
        this.id = readParam;

        this.subUser = this.userService.getUsersWithGetDoc().subscribe({
          next: (users: UserModel[]) => {
            const user = users.find((u) => u.id === this.id);
            if (user) {
              this.user = user;
              console.log('Fetched user:', this.user);
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

    this.privacyPolicyText = this.translationService.getTranslation(
      'sign_up_to_newsletter_privacy_policy'
    );
  }
  close() {
    const modal = document.querySelector('.modal');

    if (modal) {
      modal.classList.remove('show');
      modal.classList.add('hide');
      this.closeModal.emit();
    }
  }

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }

  ngOnDestroy(): void {
    this.subUser?.unsubscribe();
    this.subRoute?.unsubscribe();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

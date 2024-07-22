import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsersWithGetDoc().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
    });
  }

  onSelect(id?: string) {
    if (id) {
      this.router.navigate(['users', id, 'edit']);
    }
  }
}

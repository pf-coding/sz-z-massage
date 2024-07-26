import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  users: UserModel[] = [];
  paginatedUsers: UserModel[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  searchName: string = '';
  searchEmail: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortKey: keyof UserModel | 'index' = 'index';
  admins: any[] = []; // Az adminok tömbje

  // Pagination variables for admin users
  paginatedAdmins: any[] = [];
  currentAdminPage: number = 1;
  adminPageSize: number = 2;
  totalAdminPages: number = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.userService.getUsersWithGetDoc().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  onSelect(id?: string) {
    if (id) {
      this.router.navigate(['users', id, 'edit']);
    }
  }

  onDelete(id?: string) {
    if (id && confirm(`Are you sure to delete this user from the list?`)) {
      this.userService.deleteUser(id).subscribe({
        complete: () => {
          this.users = this.users.filter((user) => user.id !== id);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  applyFilters() {
    let filteredUsers = this.users;
    if (this.searchName) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
    if (this.searchEmail) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }

    this.sortUsers(filteredUsers);
    this.totalPages = Math.ceil(filteredUsers.length / this.pageSize);
    this.paginateUsers(filteredUsers);
  }

  paginateUsers(users: UserModel[]) {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = users.slice(startIndex, endIndex);
  }

  sortUsers(users: UserModel[]) {
    if (this.sortKey === 'index') {
      this.paginatedUsers = users;
      return;
    }

    users.sort((a, b) => {
      let compareA, compareB;

      if (this.sortKey === 'date') {
        const dateA =
          a.year !== undefined &&
          a.month !== undefined &&
          a.day !== undefined &&
          a.hour !== undefined &&
          a.minute !== undefined
            ? new Date(a.year, a.month - 1, a.day, a.hour, a.minute)
            : new Date(0); // Default to epoch time if any part is undefined

        const dateB =
          b.year !== undefined &&
          b.month !== undefined &&
          b.day !== undefined &&
          b.hour !== undefined &&
          b.minute !== undefined
            ? new Date(b.year, b.month - 1, b.day, b.hour, b.minute)
            : new Date(0); // Default to epoch time if any part is undefined

        compareA = dateA.getTime();
        compareB = dateB.getTime();
      } else {
        compareA = a[this.sortKey] ?? ''; // Use empty string if undefined
        compareB = b[this.sortKey] ?? ''; // Use empty string if undefined
      }

      if (compareA < compareB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.paginateUsers(users); // Paginate after sorting
  }

  sortBy(key: keyof UserModel | 'index' | 'date') {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'users');
  }

  exportFilteredToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.paginatedUsers
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'filtered_users');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  refreshList() {
    window.location.reload();
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  public registration() {
    this.authService.registration(this.loginForm.value).subscribe();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (data: any[]) => {
        this.admins = data;
        this.applyAdminFilters();
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
      },
    });
  }

  deleteAdmin(uid: string): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(uid).subscribe(
        () => {
          this.admins = this.admins.filter((admin) => admin.uid !== uid);
          this.applyAdminFilters();
        },
        (error) => {
          console.error('Error deleting admin:', error);
        }
      );
    }
  }

  applyAdminFilters() {
    const startIndex = (this.currentAdminPage - 1) * this.adminPageSize;
    const endIndex = startIndex + this.adminPageSize;
    this.paginatedAdmins = this.admins.slice(startIndex, endIndex);
    this.totalAdminPages = Math.ceil(this.admins.length / this.adminPageSize);
  }

  previousAdminPage() {
    if (this.currentAdminPage > 1) {
      this.currentAdminPage--;
      this.applyAdminFilters();
    }
  }

  nextAdminPage() {
    if (this.currentAdminPage < this.totalAdminPages) {
      this.currentAdminPage++;
      this.applyAdminFilters();
    }
  }
}

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

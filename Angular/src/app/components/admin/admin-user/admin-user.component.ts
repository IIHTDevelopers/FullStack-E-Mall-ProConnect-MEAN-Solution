import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
import { ActivityLog, User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: any[] = [];
  newUserForm!: FormGroup;
  newUser: User = {
    username: '',
    email: '',
    password: '',
    profile: {},
    activityLog: [],
    favorites: []
  };
  error: string | null = null;
  isEditing: boolean = false;
  searchEmail: string = '';
  selectedUser: User | null = null;
  userActivity: ActivityLog[] = [];
  userFavorites: string[] = [];
  searchEmailControl!: FormControl;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm(): void {
    this.searchEmailControl = this.formBuilder.control('');
    this.newUserForm = this.formBuilder.group({
      _id: [''], // Add _id field in the form
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        address: ['']
      })
    });
  }

  loadUsers(): void {
    this.adminService.viewAllUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.newUserForm.invalid) {
      return;
    }

    if (this.newUserForm.get('_id')?.value) { // Check _id field in the form
      this.updateUserProfile();
    } else {
      const newUser: User = {
        ...this.newUserForm.value,
        activityLog: [],
        favorites: []
      };

      this.userService.createUser(newUser).subscribe(
        createdUser => {
          console.log('User created:', createdUser);
          this.loadUsers();
          this.newUserForm.reset();
          this.error = null;
        },
        error => {
          console.error('Error creating user:', error);
          this.error = error.error.error;
        }
      );
    }
  }

  updateUserProfile(): void {
    const updatedUser: User = {
      ...this.newUserForm.value,
      activityLog: this.newUser.activityLog,
      favorites: this.newUser.favorites
    };

    this.userService.updateUserProfile(updatedUser._id ?? '', updatedUser).subscribe(
      updatedUserProfile => {
        console.log('User profile updated:', updatedUserProfile);
        this.loadUsers();
        this.newUserForm.reset();
        this.error = null;
      },
      error => {
        console.error('Error updating user profile:', error);
        this.error = error.error.error;
      }
    );
  }

  editUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe(
      (userProfile: User) => {
        this.isEditing = true;
        this.newUserForm.patchValue({
          _id: userProfile._id,
          username: userProfile.username,
          email: userProfile.email,
          password: userProfile.password,
          profile: {
            firstName: userProfile.profile.firstName,
            lastName: userProfile.profile.lastName,
            address: userProfile.profile.address
          }
        });
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
        this.newUserForm.reset();
        this.isEditing = false;
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  searchUser(): void {
    if (this.searchEmail.trim() === '') {
      return;
    }

    this.userService.getUserByEmail(this.searchEmail).subscribe(
      user => {
        this.users = [user];
        this.searchEmail = '';
        this.isEditing = false;
      },
      error => {
        console.error('Error fetching user by email:', error);
      }
    );
  }

  getUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe(
      (userProfile: User) => {
        this.selectedUser = userProfile;
        this.getUserActivity(userId);
        this.getUserFavorites(userId);
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  getUserActivity(userId: string): void {
    this.userService.getUserActivity(userId).subscribe(
      (activity: ActivityLog[]) => {
        this.userActivity = activity;
      },
      (error: any) => {
        console.error('Error fetching user activity:', error);
      }
    );
  }

  getUserFavorites(userId: string): void {
    this.userService.getUserFavorites(userId).subscribe(
      (favorites: string[]) => {
        this.userFavorites = favorites;
      },
      (error: any) => {
        console.error('Error fetching user favorites:', error);
      }
    );
  }
}

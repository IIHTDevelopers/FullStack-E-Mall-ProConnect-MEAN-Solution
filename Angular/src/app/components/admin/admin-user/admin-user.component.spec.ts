import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUserComponent } from './admin-user.component';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';

describe('AdminUserComponent', () => {
  let component: AdminUserComponent;
  let fixture: ComponentFixture<AdminUserComponent>;
  let adminService: AdminService;
  let userService: UserService;

  const adminServiceMock = {
    viewAllUsers: jest.fn().mockReturnValue(of([])),
    viewAllProducts: jest.fn().mockReturnValue(of([])),
    viewAllOrders: jest.fn().mockReturnValue(of([])),
    viewAllBlogPosts: jest.fn().mockReturnValue(of([])),
    viewDashboard: jest.fn().mockReturnValue(of({})),
    viewReports: jest.fn().mockReturnValue(of({})),
    viewUserAnalytics: jest.fn().mockReturnValue(of([])),
    viewProductInventory: jest.fn().mockReturnValue(of([])),
    viewSalesReports: jest.fn().mockReturnValue(of([]))
  };

  const userServiceMock = {
    getUserProfile: jest.fn().mockReturnValue(of({})),
    getUserActivity: jest.fn().mockReturnValue(of([])),
    getUserFavorites: jest.fn().mockReturnValue(of([])),
    createUser: jest.fn().mockReturnValue(of({})),
    updateUserProfile: jest.fn().mockReturnValue(of({})),
    deleteUser: jest.fn().mockReturnValue(of({})),
    getUserByEmail: jest.fn().mockReturnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AdminService, useValue: adminServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form controls on init', () => {
      expect(component.newUserForm).toBeDefined();
      expect(component.searchEmailControl).toBeDefined();
    });

    it('should load users on init', () => {
      const usersMock = [
        { _id: 'user1', username: 'user1', email: 'user1@example.com' },
        { _id: 'user2', username: 'user2', email: 'user2@example.com' }
      ];
      adminServiceMock.viewAllUsers.mockReturnValue(of(usersMock));
      component.ngOnInit();
      expect(adminServiceMock.viewAllUsers).toHaveBeenCalled();
      expect(component.users).toEqual(usersMock);
    });

    it('should fetch user profile on editUserProfile', () => {
      const userId = 'user123';
      const userProfileMock = {
        _id: userId,
        username: 'testUser',
        email: 'test@example.com',
        password: '',
        profile: { firstName: 'John', lastName: 'Doe', address: '123 Main St' }
      };
      userServiceMock.getUserProfile.mockReturnValue(of(userProfileMock));
      component.editUserProfile(userId);
      expect(userServiceMock.getUserProfile).toHaveBeenCalledWith(userId);
      expect(component.isEditing).toBe(true);
      expect(component.newUserForm.value).toEqual({
        _id: userId,
        username: 'testUser',
        email: 'test@example.com',
        password: '',
        profile: { firstName: 'John', lastName: 'Doe', address: '123 Main St' }
      });
    });

    it('should update searchEmailControl value on input', () => {
      const inputElement = fixture.nativeElement.querySelector('#searchEmail');
      inputElement.value = 'test@example.com';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.searchEmailControl.value).toBe('test@example.com');
    });

    it('should call userService.getUserProfile() and update selectedUser', () => {
      const userId = 'user123';
      const userProfileMock = { _id: userId, username: 'testuser', email: 'test@example.com' };
      userServiceMock.getUserProfile.mockReturnValue(of(userProfileMock));
      component.getUserProfile(userId);
      expect(userServiceMock.getUserProfile).toHaveBeenCalledWith(userId);
      expect(component.selectedUser).toEqual(userProfileMock);
    });

    it('should populate newUserForm for editing user profile', () => {
      const userProfileMock = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: '',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St'
        }
      };
      userServiceMock.getUserProfile.mockReturnValue(of(userProfileMock));
      component.editUserProfile(userProfileMock._id);
      expect(userServiceMock.getUserProfile).toHaveBeenCalledWith(userProfileMock._id);
      expect(component.isEditing).toBe(true);
      expect(component.newUserForm.value).toEqual({
        _id: userProfileMock._id,
        username: userProfileMock.username,
        email: userProfileMock.email,
        password: '',
        profile: {
          firstName: userProfileMock.profile.firstName,
          lastName: userProfileMock.profile.lastName,
          address: userProfileMock.profile.address
        }
      });
    });

    it('should call userService.deleteUser() and reload users', () => {
      const userId = 'user123';
      userServiceMock.deleteUser.mockReturnValue(of({}));
      component.deleteUser(userId);
      expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
      expect(adminServiceMock.viewAllUsers).toHaveBeenCalled();
    });

    it('should render the create/edit user form', () => {
      const formElement = fixture.nativeElement.querySelector('form');
      expect(formElement).toBeTruthy();
      const usernameInput = fixture.nativeElement.querySelector('#username');
      expect(usernameInput).toBeTruthy();
      const emailInput = fixture.nativeElement.querySelector('#email');
      expect(emailInput).toBeTruthy();
      const passwordInput = fixture.nativeElement.querySelector('#password');
      expect(passwordInput).toBeTruthy();
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      expect(firstNameInput).toBeTruthy();
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      expect(lastNameInput).toBeTruthy();
      const addressInput = fixture.nativeElement.querySelector('#address');
      expect(addressInput).toBeTruthy();
      const errorElement = fixture.nativeElement.querySelector('.error-message');
      expect(errorElement).toBeFalsy(); // Error element should be hidden by default
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });

    it('should disable submit button if form is invalid', () => {
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTruthy();
    });

    it('should enable submit button if form is valid', () => {
      const newUserForm = component.newUserForm;
      newUserForm.controls['username'].setValue('testuser');
      newUserForm.controls['email'].setValue('test@example.com');
      newUserForm.controls['password'].setValue('password');
      fixture.detectChanges();
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeFalsy();
    });

    it('should display error message when error is present', () => {
      component.error = 'An error occurred';
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('.error-message');
      expect(errorElement).toBeTruthy();
      expect(errorElement.textContent).toContain(component.error);
    });
  });
});

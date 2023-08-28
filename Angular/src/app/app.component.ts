import { ApplicationRef, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Mall ProConnect';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private cdRef: NgZone) {
    this.cdRef.run(() => {
      this.isLoggedIn = !!this.authService.getToken();
    });
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}

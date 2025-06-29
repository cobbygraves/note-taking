import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DrawerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'note-taking';
  isLoginPage = false;
  visible: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {
    const isDark = localStorage.getItem('theme') === 'true' ? true : false;
    //console.log(isDark);
    this.themeService.setDarkMode(isDark);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.urlAfterRedirects === '/login';
      });
  }

  showDrawer() {
    this.visible = !this.visible;
  }
}

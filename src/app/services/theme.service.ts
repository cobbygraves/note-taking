import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('theme', this.darkMode.toString());
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  setDarkMode(value: boolean) {
    this.darkMode = value;
    document.body.classList.toggle('dark-mode', value);
  }
}

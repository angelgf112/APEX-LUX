import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = true;

  isDarkTheme(): boolean {
    return this.darkMode;
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = document.body;
    body.classList.toggle('dark-theme', this.darkMode);

    // Actualiza el tema de Material
    const themeClass = this.darkMode ? 'dark-theme' : 'light-theme';
    body.classList.remove(this.darkMode ? 'light-theme' : 'dark-theme');
    body.classList.add(themeClass);
  }
}

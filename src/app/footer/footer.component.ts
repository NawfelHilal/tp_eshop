import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  template: `
    <mat-toolbar color="primary" class="footer">
      <a routerLink="/" routerLinkActive="router-link-active">back to home </a>
    </mat-toolbar>
  `,
  styles: `
  .footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0px;
  margin-top: 20px;
}
`,
})
export class FooterComponent {}

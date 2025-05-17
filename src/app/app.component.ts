import { Component } from '@angular/core';
import { NavbarComponent } from "./components/student/navbar/navbar.component";
import { FooterComponent } from "./components/student/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, FooterComponent,RouterOutlet]
})
export class AppComponent {
  title = 'Exam';
}

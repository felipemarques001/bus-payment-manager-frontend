import { Component } from '@angular/core';
import { HomeCardComponent } from '../../components/home-card/home-card.component';

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  
}

import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  imports: [RouterLink],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {
  @Input({ required: true }) title: string = "";
  @Input({ required: true }) subtitle: string = "";
  @Input({ required: true }) iconName: string = "";
  @Input({ required: true }) routerPath: string = "";
}

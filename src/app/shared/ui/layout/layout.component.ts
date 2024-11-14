import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepCarouselComponent } from './step-carousel/step-carousel.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, StepCarouselComponent, TopbarComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}

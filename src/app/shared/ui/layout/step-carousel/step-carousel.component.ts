import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { NavigationEnd, Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { filter } from 'rxjs';

@Component({
  selector: 'app-step-carousel',
  standalone: true,
  imports: [CarouselModule, CardModule, PanelModule],
  templateUrl: './step-carousel.component.html',
  styleUrl: './step-carousel.component.scss',
})
export class StepCarouselComponent implements OnInit {
  items: { step: number; label: string; path: string }[] = [];
  responsiveOptions: any[] | undefined;
  currentPath: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
      });
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1600px',
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: '1440px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '1280px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.items = [
      { step: 1, label: 'Configurar SMS', path: '/sms-configuration' },
      { step: 2, label: 'Objetivos', path: '/goals' },
      { step: 3, label: 'Preguntas', path: '/questions' },
      { step: 4, label: 'Ejemplo 4', path: '/ejemplo4' },
      { step: 5, label: 'Criterios de selección', path: '/selection-criteria' },
      { step: 6, label: 'Ejemplo 6', path: '/ejemplo6' },
      { step: 7, label: 'Ejemplo 7', path: '/ejemplo7' },
      { step: 8, label: 'Ejemplo 8', path: '/ejemplo8' },
      { step: 9, label: 'Ejemplo 9', path: '/ejemplo9' },
      { step: 10, label: 'Ejemplo 10', path: '/ejemplo10' },
    ];

    // Set the initial current path
    this.currentPath = this.router.url;
  }

  onStepClick(path: string) {
    this.router.navigate([path]);
  }

  isCurrentStep(path: string): boolean {
    return this.currentPath === path;
  }
}

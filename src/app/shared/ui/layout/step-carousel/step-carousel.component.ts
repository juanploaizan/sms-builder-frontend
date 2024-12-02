import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { NavigationEnd, Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { filter } from 'rxjs';
import { StepsService } from './step.service';

// Importa el archivo JSON directamente
import * as stepsData from './steps.json';

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

  constructor(private router: Router, private stepsService: StepsService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
      });
  }

  ngOnInit() {
    // Opciones responsivas
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

    // Carga los pasos desde el JSON importado
    this.items = (stepsData as any).default;

    // Establece el paso inicial como el primero (step 1)
    this.stepsService.changePasoActualByOrden(1).subscribe({
      next: () => {
        this.currentPath = this.items[0].path;
        this.router.navigate([this.currentPath]);
      },
      error: (err) => {
        console.error('Error al establecer el paso inicial:', err);
      },
    });
  }

  onStepClick(path: string) {
    // Encuentra el orden correspondiente al path en el archivo JSON
    const stepItem = this.items.find((item) => item.path === path);
    if (stepItem) {
      this.router.navigate([path]);
      this.stepsService.changePasoActualByOrden(stepItem.step).subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (err) => {
          console.error('Error al cambiar el paso:', err);
        },
      });
    } else {
      console.error('Path no encontrado en steps.json:', path);
    }
  }

  isCurrentStep(path: string): boolean {
    return this.currentPath === path;
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MenubarModule, SidebarComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Planeación',
        icon: 'pi pi-calendar',
        items: [
          { label: 'Ver seleccionados', icon: 'pi pi-eye' },
          { label: 'Estudios', icon: 'pi pi-book' },
          { label: 'Proceso', icon: 'pi pi-cog' },
          { label: 'Restaurar', icon: 'pi pi-refresh' },
          { label: 'Respaldar', icon: 'pi pi-save' },
        ],
      },
      {
        label: 'Búsqueda de estudios',
        icon: 'pi pi-search',
        items: [
          { label: 'Configurar SMS', icon: 'pi pi-cog' },
          { label: 'Metas', icon: 'pi pi-bullseye' },
          { label: 'Preguntas de investigación', icon: 'pi pi-question' },
          { label: 'Tema de búsqueda', icon: 'pi pi-tag' },
          { label: 'Atributos de calidad', icon: 'pi pi-star' },
          { label: 'Fuente', icon: 'pi pi-database' },
          { label: 'Criterios de selección', icon: 'pi pi-filter' },
          { label: 'Cadena de búsqueda', icon: 'pi pi-link' },
        ],
      },
      {
        label: 'Análisis de calidad',
        icon: 'pi pi-chart-bar',
        items: [{ label: 'Tabla de calidad', icon: 'pi pi-table' }],
      },
      {
        label: 'Colección de datos',
        icon: 'pi pi-folder-open',
        items: [
          { label: 'Palabras clave', icon: 'pi pi-key' },
          { label: 'SPS con...', icon: 'pi pi-list' },
        ],
      },
      {
        label: 'Análisis y clasificación de estudios',
        icon: 'pi pi-chart-line',
        items: [
          { label: 'SPS por pregunta', icon: 'pi pi-question-circle' },
          { label: 'SPS por tema', icon: 'pi pi-tags' },
        ],
      },
      {
        label: 'Resultados',
        icon: 'pi pi-chart-pie',
        items: [
          {
            label:
              'SPS por año, tipo, estrategia de búsqueda, tema, pregunta, etc.',
            icon: 'pi pi-calendar',
          },
        ],
      },
    ];
  }
}

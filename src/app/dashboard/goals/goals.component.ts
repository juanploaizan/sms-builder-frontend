import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [PanelModule, CardModule, ButtonModule, RippleModule, TableModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent implements OnInit {
  constructor() {}

  goals!: any[];

  ngOnInit(): void {
    this.goals = [
      {
        id: 1,
        name: 'Meta 1',
        description: 'Descripción de la meta 1',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        progress: 50,
      },
      {
        id: 2,
        name: 'Meta 2',
        description: 'Descripción de la meta 2',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        progress: 25,
      },
      {
        id: 3,
        name: 'Meta 3',
        description: 'Descripción de la meta 3',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        progress: 75,
      },
    ];
  }
}

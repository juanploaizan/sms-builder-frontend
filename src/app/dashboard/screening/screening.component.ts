import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ScreeningService } from './data-access/screening.service';
import { Screening } from './api/screening';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    InputTextareaModule,
    RatingModule,
    PanelModule,
    PaginatorModule,
    ButtonModule,
  ],
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.scss',
})
export class ScreeningComponent implements OnInit {
  screenings: Screening[] = [];
  currentScreening: Screening | null = null;

  keywords: string[] = [];

  constructor(private screeningService: ScreeningService) {}

  ngOnInit(): void {
    this.loadScreenings();
  }

  loadScreenings(): void {
    this.screeningService.getScreenings().subscribe((data: Screening[]) => {
      this.screenings = data.filter((screening) => screening.id !== '');
      this.currentScreening = this.screenings[0];
      this.keywords = this.currentScreening.keywords.split(';');
    });
  }

  paginate(event: any): void {
    this.currentScreening = this.screenings[event.page];
  }

  editScreening(): void {
    // Implementar lógica de edición
  }
}

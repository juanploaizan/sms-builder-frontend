import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { Study } from './api/study';
import { StudyService } from './data-access/study.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-duplicate-studies',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    CheckboxModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
  ],
  templateUrl: './duplicate-studies.component.html',
  styleUrl: './duplicate-studies.component.scss',
})
export class DuplicateStudiesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private studyService: StudyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.studyService.getStudies().subscribe((data) => {
      this.studies = data;
    });

    this.studies.forEach((study) => {
      this.studyService.getSource(study.fuente).subscribe((data) => {
        study.nombreFuente = data.nombre;
      });
    });

    this.cols = [
      { field: 'source', header: 'Fuente' },
      { field: 'study', header: 'Estudios' },
      { field: 'author', header: 'Autores' },
    ];
  }

  cols!: Column[];
  exportColumns!: ExportColumn[];

  studies: Study[] = [];

  selectedStudies: Study[] = [];

  searchValue: string = '';

  editStudy(study: Study) {}
}

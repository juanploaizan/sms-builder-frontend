import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Source } from './api/sources';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SourcesService } from './data-access/sources.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-sources',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
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
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss',
})
export class SourcesComponent implements OnInit {
  cols!: Column[];
  exportColumns!: ExportColumn[];

  sourceForm!: FormGroup;
  sourcesList: Source[] = [];
  sourceDialog = false;
  selectedSources!: Source[];
  isSaving = false;
  searchValue = '';
  options: Option[] | undefined;

  constructor(
    private sourcesService: SourcesService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.sourceForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sourcesService.getSources().subscribe((sources) => {
      this.sourcesList = sources;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo de fuente' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.options = [
      {
        label: 'Base de datos',
        value: 'BASE_DATOS',
      },
      {
        label: 'Bola de nieve',
        value: 'BOLA_NIEVE',
      },
      {
        label: 'Inclusión directa',
        value: 'INCLUSION_DIRECTA',
      },
    ];
  }

  openNew() {
    this.sourceForm.reset();
    this.sourceDialog = true;
  }

  deleteSelectedSources() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar las fuentes seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedSources.forEach((source) => {
          this.sourcesService.deleteSource(source.id).subscribe();
        });
        this.sourcesList = this.sourcesList.filter(
          (val) => !this.selectedSources.includes(val)
        );
        this.selectedSources = [];
        this.showMessage('success', 'Exitoso', 'Fuentes eliminadas');
        this.updateSourceList();
      },
    });
  }

  editSource(source: Source) {
    this.sourceForm.patchValue(source);
    this.sourceDialog = true;
  }

  deleteSource(source: Source) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar la fuente?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sourcesService.deleteSource(source.id).subscribe({
          next: () => {
            this.sourcesList = this.sourcesList.filter(
              (val) => val.id !== source.id
            );
            this.showMessage('success', 'Exitoso', 'Objetivo eliminado');
            this.updateSourceList();
          },
          error: () => {
            this.showMessage('error', 'Error', 'Error al eliminar el objetivo');
          },
        });
      },
    });
  }

  hideDialog() {
    this.sourceDialog = false;
    this.isSaving = false;
  }

  saveSource() {
    if (this.sourceForm.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    this.isSaving = true;

    console.log(this.sourceForm.value);
    if (this.sourceForm.value.id) {
      this.sourcesService.updateSource(this.sourceForm.value).subscribe({
        next: (res) => {
          this.sourcesList[this.findIndexById(res.id)] = res;
          this.showMessage('success', 'Exitoso', 'Fuente actualizada');
          this.updateSourceList();
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al actualizar la fuente');
        },
      });
    } else {
      this.sourcesService.createSource(this.sourceForm.value).subscribe({
        next: (res) => {
          this.sourcesList.push(res);
          this.showMessage('success', 'Exitoso', 'Fuente creada');
          this.updateSourceList();
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al crear la fuente');
        },
      });
    }
    this.sourceDialog = false;
    this.isSaving = false;
    this.resetForm();
  }

  private findIndexById(id: string): number {
    return this.sourcesList.findIndex((source) => source.id === id);
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }

  private resetForm() {
    this.sourceForm.reset();
  }

  private updateSourceList() {
    this.sourcesList = [...this.sourcesList];
  }
}

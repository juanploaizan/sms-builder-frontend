import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SelectionCriteria } from './api/selection-criteria';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectionCriteriaService } from './data-access/selection-criteria.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

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
  selector: 'app-selection-criteria',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputSwitchModule,
    InputTextareaModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
  ],
  templateUrl: './selection-criteria.component.html',
  styleUrl: './selection-criteria.component.scss',
})
export class SelectionCriteriaComponent implements OnInit {
  cols!: Column[];
  exportColumns!: ExportColumn[];

  formSelectionCriteria!: FormGroup;
  selectionCriteria: SelectionCriteria[] = [];
  searchValue: string = '';
  selectionCriteriaDialog: boolean = false;
  selectedSelectionCriteria!: SelectionCriteria[];
  isSaving: boolean = false;

  constructor(
    private selectionCriteriaService: SelectionCriteriaService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formSelectionCriteria = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      paraExclusion: [false],
    });
  }

  ngOnInit(): void {
    this.loadSelectionCriteria();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'paraExclusion', header: '¿Para Exclusión?' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  loadSelectionCriteria() {
    this.selectionCriteriaService.getSelectionCriteria().subscribe((data) => {
      this.selectionCriteria = data;
    });
  }

  openNew() {
    this.resetForm();
    this.selectionCriteriaDialog = true;
  }

  resetForm() {
    this.formSelectionCriteria.reset();
  }

  editSelectionCriteria(selectionCriteria: SelectionCriteria) {
    this.formSelectionCriteria.patchValue(selectionCriteria);
    this.selectionCriteriaDialog = true;
  }

  saveSelectionCriteria() {
    if (this.formSelectionCriteria.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    this.isSaving = true;

    if (this.formSelectionCriteria.value.id) {
      this.selectionCriteriaService
        .updateSelectionCriterion(this.formSelectionCriteria.value)
        .subscribe({
          next: (res) => {
            this.selectionCriteria[this.findIndexById(res.id)] = res;
            this.showMessage(
              'success',
              'Exitoso',
              'Criterio de selección actualizado'
            );
            this.updateSelectionCriteria();
          },
          error: () => {
            this.showMessage(
              'error',
              'Error',
              'Error al actualizar el criterio de selección'
            );
          },
        });
    } else {
      this.formSelectionCriteria.removeControl('id');

      this.selectionCriteriaService
        .createSelectionCriterion(this.formSelectionCriteria.value)
        .subscribe({
          next: (res) => {
            this.selectionCriteria.push(res);
            this.showMessage(
              'success',
              'Exitoso',
              'Criterio de selección creado'
            );
            this.updateSelectionCriteria();
          },
          error: () => {
            this.showMessage(
              'error',
              'Error',
              'Error al crear el criterio de selección'
            );
          },
        });
    }
    this.selectionCriteriaDialog = false;
    this.isSaving = false;
    this.resetForm();
  }

  deleteSelectionCriteria(selectionCriteria: SelectionCriteria) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar este criterio de selección?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectionCriteriaService
          .deleteSelectionCriterion(selectionCriteria.id)
          .subscribe({
            next: () => {
              this.selectionCriteria = this.selectionCriteria.filter(
                (val) => val.id !== selectionCriteria.id
              );
              this.showMessage(
                'success',
                'Exitoso',
                'Criterio de selección eliminado'
              );
              this.updateSelectionCriteria();
            },
            error: () => {
              this.showMessage(
                'error',
                'Error',
                'Error al eliminar el criterio de selección'
              );
            },
          });
      },
    });
  }

  deleteSelectionCriterias() {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar los criterios de selección seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedSelectionCriteria.forEach((sc) => {
          this.selectionCriteriaService
            .deleteSelectionCriterion(sc.id)
            .subscribe();
        });
        this.selectionCriteria = this.selectionCriteria.filter(
          (val) => !this.selectedSelectionCriteria.includes(val)
        );
        this.selectedSelectionCriteria = [];
        this.showMessage(
          'success',
          'Exitoso',
          'Criterios de selección eliminados'
        );
        this.updateSelectionCriteria();
      },
    });
  }

  private updateSelectionCriteria() {
    this.selectionCriteria = [...this.selectionCriteria];
  }

  private findIndexById(id: string): number {
    return this.selectionCriteria.findIndex((sc) => sc.id === id);
  }

  hideDialog() {
    this.selectionCriteriaDialog = false;
    this.isSaving = false;
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }
}

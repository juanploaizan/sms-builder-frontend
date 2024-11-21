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
import { QualityAttribute } from './api/quality-attribute';
import { QualityAttributeService } from './data-access/quality-attribute.service';
import { CheckboxModule } from 'primeng/checkbox';

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
  selector: 'app-quality-attributes',
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
  templateUrl: './quality-attributes.component.html',
  styleUrl: './quality-attributes.component.scss',
})
export class QualityAttributesComponent implements OnInit {
  cols!: Column[];
  exportColumns!: ExportColumn[];

  qualityAttributeForm!: FormGroup;
  qualityAttributes: QualityAttribute[] = [];
  searchValue: string = '';
  qualityAttributeDialog: boolean = false;
  selectedAttributes!: QualityAttribute[];
  isSaving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private qualityAttributeService: QualityAttributeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.qualityAttributeForm = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
      objetivo: [true],
    });
  }

  ngOnInit(): void {
    this.qualityAttributeService.getQualityAttributes().subscribe((data) => {
      this.qualityAttributes = data;
    });

    this.cols = [{ field: 'descripcion', header: 'Índice de Calidad' }];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.resetForm();
    this.qualityAttributeDialog = true;
  }

  deleteSelectedQualityAttributes() {
    this.confirmationService.confirm({
      message:
        '¿Seguro que quieres eliminar los atributos de calidad seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAttributes.forEach((qualityAttribute) => {
          this.qualityAttributeService
            .deleteQualityAttribute(qualityAttribute.id)
            .subscribe();
        });
        this.qualityAttributes = this.qualityAttributes.filter(
          (val) => !this.selectedAttributes.includes(val)
        );
        this.selectedAttributes = [];
        this.showMessage(
          'success',
          'Exitoso',
          'Atributos de calidad eliminados'
        );
        this.updateQualityAttributes();
      },
    });
  }

  editQualityAttribute(qualityAttribute: QualityAttribute) {
    this.qualityAttributeForm.patchValue(qualityAttribute);
    this.qualityAttributeDialog = true;
  }

  deleteQualityAttribute(qualityAttribute: QualityAttribute) {
    this.confirmationService.confirm({
      message:
        '¿Seguro que quieres eliminar el atributo de calidad ' +
        qualityAttribute.id +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.qualityAttributeService
          .deleteQualityAttribute(qualityAttribute.id)
          .subscribe({
            next: () => {
              this.qualityAttributes = this.qualityAttributes.filter(
                (val) => val.id !== qualityAttribute.id
              );
              this.showMessage(
                'success',
                'Exitoso',
                'Atributo de calidad eliminado'
              );
              this.updateQualityAttributes();
            },
            error: () => {
              this.showMessage(
                'error',
                'Error',
                'Error al eliminar el atributo de calidad'
              );
            },
          });
      },
    });
  }

  hideDialog() {
    this.qualityAttributeDialog = false;
    this.isSaving = false;
  }

  saveQualityAttribute() {
    if (this.qualityAttributeForm.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    this.isSaving = true;

    if (this.qualityAttributeForm.value.id) {
      this.qualityAttributeForm.value.objetivo =
        this.qualityAttributeForm.value.objetivo ?? false;

      this.qualityAttributeService
        .updateQualityAttribute(this.qualityAttributeForm.value)
        .subscribe({
          next: (res) => {
            this.qualityAttributes[this.findIndexById(res.id)] = res;
            this.showMessage(
              'success',
              'Exitoso',
              'Atributo de calidad actualizado'
            );
            this.updateQualityAttributes();
          },
          error: () => {
            this.showMessage(
              'error',
              'Error',
              'Error al actualizar el atributo de calidad'
            );
          },
        });
    } else {
      this.qualityAttributeService
        .createQualityAttribute(this.qualityAttributeForm.value)
        .subscribe({
          next: (res) => {
            this.qualityAttributes.push(res);
            this.showMessage(
              'success',
              'Exitoso',
              'Atributo de calidad creado'
            );
            this.updateQualityAttributes();
          },
          error: () => {
            this.showMessage(
              'error',
              'Error',
              'Error al crear el atributo de calidad'
            );
          },
        });
    }
    this.qualityAttributeDialog = false;
    this.isSaving = false;
    this.resetForm();
  }

  private findIndexById(id: string): number {
    return this.qualityAttributes.findIndex(
      (qualityAttribute) => qualityAttribute.id === id
    );
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
    this.qualityAttributeForm.reset();
  }

  private updateQualityAttributes() {
    this.qualityAttributes = [...this.qualityAttributes];
  }
}

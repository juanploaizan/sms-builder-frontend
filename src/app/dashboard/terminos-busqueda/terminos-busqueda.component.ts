import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Termino } from './api/termino';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TerminoService } from './data-access/termino.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';

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
  selector: 'app-terminos-busqueda',
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
    ChipsModule
  ],
  templateUrl: './terminos-busqueda.component.html',
  styleUrl: './terminos-busqueda.component.scss'
})
export class TerminosBusquedaComponent implements OnInit {
  cols!: Column[];
  exportColumns!: ExportColumn[];

  form!: FormGroup;
  terminos: Termino[] = [];
  searchValue: string = '';
  terminoDialog: boolean = false;
  esEditar: boolean = false;
  selectedTerminos!: Termino[];
  isSaving: boolean = false;

  sinonimos: string[] = [];
  constructor(
    private fb: FormBuilder,
    private terminoService: TerminoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      descripcion: ['', Validators.required],
      sinonimos: [[]],
    });
  }

  ngOnInit(): void {
    this.terminoService.getTerminos().subscribe((data) => {
      this.terminos = data;
    });

    this.cols = [
      { field: 'id', header: 'Termino de búsqueda' },
      { field: 'sinonimos', header: 'Sinónimo' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.resetForm();
    this.terminoDialog = true;
    this.esEditar = false;
  }

  deleteSelectedTerminos() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar los terminos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedTerminos.forEach((termino) => {
          this.terminoService.deleteTermino(termino.id).subscribe();
        });
        this.terminos = this.terminos.filter(
          (val) => !this.selectedTerminos.includes(val)
        );
        this.selectedTerminos = [];
        this.showMessage('success', 'Exitoso', 'Terminos eliminados');
        this.updateTerminos();
      },
    });
  }

  editTermino(termino: Termino) {
    this.form.patchValue(termino);
    this.terminoDialog = true;
    this.esEditar = true;
    this.sinonimos = termino.sinonimos;
  }

  deleteTermino(termino: Termino) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar el termino ' + termino.id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.terminoService.deleteTermino(termino.id).subscribe({
          next: () => {
            this.terminos = this.terminos.filter((val) => val.id !== termino.id);
            this.showMessage('success', 'Exitoso', 'Termino eliminado');
            this.updateTerminos();
          },
          error: () => {
            this.showMessage('error', 'Error', 'Error al eliminar el termino');
          },
        });
      },
    });
  }

  hideDialog() {
    this.terminoDialog = false;
    this.isSaving = false;
  }

  saveTermino() {
    if (this.form.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    this.isSaving = true;

    if (this.esEditar) {
      this.form.get('sinonimos')?.setValue(this.sinonimos);
      this.terminoService.updateTermino(this.form.value).subscribe({
        next: (res) => {
          this.terminos[this.findIndexById(res.id)] = res;
          this.showMessage('success', 'Exitoso', 'Termino actualizado');
          this.updateTerminos();
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al actualizar el termino');
        },
      });
    } else {

      this.sinonimos.push(this.form.value.descripcion);
      this.form.get('sinonimos')?.setValue(this.sinonimos);
      this.terminoService.createTermino(this.form.value).subscribe({
        next: (res) => {
          this.terminos.push(res);
          this.showMessage('success', 'Exitoso', 'Termino creado');
          this.updateTerminos();
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al crear el termino');
        },
      });
    }
    this.terminoDialog = false;
    this.isSaving = false;
    this.resetForm();
  }

  private findIndexById(id: string): number {
    return this.terminos.findIndex((goal) => goal.id === id);
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
    this.form.reset();
  }

  private updateTerminos() {
    this.terminos = [...this.terminos];
    this.sinonimos = [];
  }

  verSinonimos(sinonimos: string[]): string {
    if (!sinonimos) {
      return ''; // Retorna una cadena vacía si sinonimos es null o undefined
    }
    return sinonimos.join(', '); // Si no es null, une los elementos con coma
  }

}
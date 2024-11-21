import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SearchString } from './api/search-string';
import { SearchStringsService } from './data-access/search-strings.service';
import { SourcesService } from '../sources/data-access/sources.service';
import { Source } from '../sources/api/sources';

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
  selector: 'app-search-strings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    RippleModule,
    TableModule,
    ToolbarModule,
  ],
  templateUrl: './search-strings.component.html',
  styleUrl: './search-strings.component.scss',
})
export class SearchStringsComponent implements OnInit {
  cols: Column[] = [];
  exportColumns: ExportColumn[] = [];
  searchStringsList: SearchString[] = [];
  searchStringForm!: FormGroup;
  searchStringDialog = false;
  isSaving = false;
  maxDate = new Date();
  selectedSearchStrings: SearchString[] = [];
  searchValue = '';
  visible = false;
  sourcesList: Source[] = [];

  constructor(
    private sourcesService: SourcesService,
    private searchStringsService: SearchStringsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadSearchStrings();
    this.loadSources();
    this.initializeColumns();
  }

  private initializeForm(): void {
    this.searchStringForm = this.fb.group({
      id: [''],
      consulta: ['', Validators.required],
      resultadoPreliminar: ['', Validators.required],
      resultadoFinal: ['', Validators.required],
      baseDatos: new FormControl<Source | null>(null, Validators.required),
      fechaConsulta: new FormControl<Date | null>(null, Validators.required),
    });
  }

  private loadSearchStrings(): void {
    this.searchStringsService.getSearchStrings().subscribe((ss) => {
      this.searchStringsList = ss;
    });
  }

  private loadSources(): void {
    this.sourcesService.getSourcesDatabaseType().subscribe((sources) => {
      this.sourcesList = sources;
    });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'baseDatos.nombre', header: 'Base de datos' },
      { field: 'consulta', header: 'Consulta' },
      { field: 'fechaConsulta', header: 'Fecha de consulta' },
      { field: 'resultadoPreliminar', header: 'Resultado preliminar' },
      { field: 'resultadoFinal', header: 'Resultado final' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew(): void {
    this.searchStringDialog = true;
  }

  editSearchString(searchString: SearchString): void {
    this.searchStringForm.patchValue(searchString);
    this.searchStringDialog = true;
  }

  showConsultaDialog(): void {
    this.visible = true;
  }

  deleteSearchString(ss: Source): void {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar la cadena de búsqueda?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.searchStringsService.deleteSearchString(ss.id).subscribe({
          next: () => {
            this.searchStringsList = this.searchStringsList.filter(
              (val) => val.id !== ss.id
            );
            this.showMessage(
              'success',
              'Exitoso',
              'Cadena de búsqueda eliminada'
            );
            this.updateSearchStringList();
          },
          error: () => {
            this.showMessage(
              'error',
              'Error',
              'Error al eliminar la cadena de búsqueda'
            );
          },
        });
      },
    });
  }

  deleteSelectedSearchStrings(): void {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar las cadenas seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteObservables = this.selectedSearchStrings.map((ss) =>
          this.searchStringsService.deleteSearchString(ss.id).toPromise()
        );

        Promise.all(deleteObservables)
          .then(() => {
            this.searchStringsList = this.searchStringsList.filter(
              (ss) => !this.selectedSearchStrings.includes(ss)
            );
            this.selectedSearchStrings = [];
            this.showMessage(
              'success',
              'Exitoso',
              'Cadenas de búsqueda eliminadas'
            );
            this.updateSearchStringList();
          })
          .catch(() => {
            this.showMessage(
              'error',
              'Error',
              'Error al eliminar las cadenas de búsqueda'
            );
          });
      },
    });
  }

  saveSearchString(): void {
    if (this.searchStringForm.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    const searchString = this.searchStringForm.value;
    const saveObservable = searchString.id
      ? this.searchStringsService.updateSearchString(searchString)
      : this.searchStringsService.createSearchString(searchString);

    saveObservable.subscribe({
      next: (res) => {
        if (searchString.id) {
          this.searchStringsList[this.findIndexById(res.id)] = res;
          this.showMessage(
            'success',
            'Exitoso',
            'Cadena de búsqueda actualizada'
          );
        } else {
          this.searchStringsList.push(res);
          this.showMessage('success', 'Exitoso', 'Cadena de búsqueda creada');
        }
        this.updateSearchStringList();
      },
      error: () => {
        this.showMessage(
          'error',
          'Error',
          `Error al ${
            searchString.id ? 'actualizar' : 'crear'
          } la cadena de búsqueda`
        );
      },
    });

    this.searchStringDialog = false;
    this.isSaving = false;
    this.resetForm();
  }

  hideDialog(): void {
    this.searchStringDialog = false;
    this.isSaving = false;
  }

  private findIndexById(id: string): number {
    return this.searchStringsList.findIndex((ss) => ss.id === id);
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }

  private resetForm(): void {
    this.searchStringForm.reset();
  }

  private updateSearchStringList(): void {
    this.searchStringsList = [...this.searchStringsList];
  }
}

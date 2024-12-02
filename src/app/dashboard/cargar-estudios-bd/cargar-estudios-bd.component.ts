import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FuenteService } from './data-access/fuente.service';
import { FileService } from './data-access/file.service';
import { RevisionService } from './data-access/revision.service'; // Importa el RevisionService
import { Fuente } from './api/fuente';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-cargar-estudios-bd',
  standalone: true,
  templateUrl: './cargar-estudios-bd.component.html',
  styleUrls: ['./cargar-estudios-bd.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    FileUploadModule,
  ],
  providers: [MessageService],
})
export class CargarEstudiosBDComponent implements OnInit {
  formCarga!: FormGroup;
  fuentes: Fuente[] = []; // Solo fuentes de tipo BASE_DATOS
  tiposArchivo = [
    { label: 'RIS', value: 'RIS' },
    { label: 'BIBTEX', value: 'BIBTEX' },
  ];
  selectedFile: File | null = null;
  pasoActualId: string | null = null; // Se obtiene desde el RevisionService

  constructor(
    private fb: FormBuilder,
    private fuenteService: FuenteService,
    private fileService: FileService,
    private revisionService: RevisionService, // Servicio para obtener el paso actual
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formCarga = this.fb.group({
      fuente: [null, Validators.required],
      tipoArchivo: [null, Validators.required],
    });

    this.loadFuentesBaseDatos();

    // Obtener el paso actual desde el RevisionService
    this.loadPasoActual();
  }

  // Cargar fuentes de tipo BASE_DATOS
  loadFuentesBaseDatos() {
    this.fuenteService.getFuentesBaseDatos().subscribe({
      next: (data) => {
        this.fuentes = data;
      },
      error: (err) => {
        console.error('Error al cargar las fuentes:', err);
        this.showMessage('error', 'Error al cargar las fuentes');
      },
    });
  }

  // Obtener el paso actual desde RevisionService
  loadPasoActual(): void {
    this.revisionService.getPasoActual().subscribe({
      next: (data: { id: string }) => {
        this.pasoActualId = data.id; //
      },
      error: (err) => {
        console.error('Error al obtener el paso actual:', err);
        this.showMessage('error', 'No se pudo obtener el paso actual');
      },
    });
  }


  // Manejar selección de archivo
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Limpiar archivo seleccionado
  clearFile() {
    this.selectedFile = null;
    const fileInput = document.getElementById('archivo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input
    }
  }

  // Cargar archivo al backend
  uploadFile() {
    if (this.formCarga.valid && this.selectedFile) {
      // Obtener valores del formulario
      const { fuente, tipoArchivo } = this.formCarga.value;

      // Validar que el ID de la fuente sea válido
      const fuenteId = fuente?.id;
      if (!fuenteId) {
        this.showMessage('error', 'Seleccione una fuente válida');
        return;
      }

      // Validar que pasoActualId sea válido
      if (!this.pasoActualId) {
        this.showMessage('error', 'No se pudo obtener el paso actual');
        return;
      }

      // Realizar la solicitud al servicio de archivos
      this.fileService
        .uploadFile(this.pasoActualId, fuenteId, tipoArchivo, this.selectedFile as File)
        .subscribe({
          next: () => this.showMessage('success', 'Archivo cargado con éxito'),
          error: (err) => {
            console.error('Error en uploadFile:', err);
            this.showMessage('error', 'Error al cargar el archivo');
          },
        });
    } else {
      this.showMessage('error', 'Complete el formulario y seleccione un archivo válido');
    }
  }

  // Obtener extensiones aceptadas para el input de archivo
  getFileAccept(): string {
    const tipo = this.formCarga.get('tipoArchivo')?.value;
    return tipo === 'RIS' ? '.ris' : tipo === 'BIBTEX' ? '.bib' : '';
  }

  // Mostrar mensajes al usuario
  showMessage(severity: string, detail: string) {
    this.messageService.add({ severity, detail, life: 3000 });
  }
}

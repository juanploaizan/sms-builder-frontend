import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FuenteService } from './data-access/fuente.service';
import { FileService } from './data-access/file.service';
import { Fuente } from './api/fuente';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-cargar-estudios-bd',
  standalone: true,
  templateUrl: './cargar-estudios-id.component.html',
  styleUrls: ['./cargar-estudios-id.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    FileUploadModule,
  ],
  providers: [MessageService],
})
export class CargarEstudiosIdComponent implements OnInit {
  formCarga!: FormGroup;
  fuentes: Fuente[] = []; // Solo fuentes de tipo BASE_DATOS
  tiposArchivo = [
    { label: 'RIS', value: 'RIS' },
    { label: 'BIBTEX', value: 'BIBTEX' },
  ];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private fuenteService: FuenteService,
    private fileService: FileService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formCarga = this.fb.group({
      fuente: [null, Validators.required],
      tipoArchivo: [null, Validators.required],
    });

    this.loadFuentes(); // Cambiado para cargar solo fuentes BASE_DATOS
  }

  loadFuentes() {
    this.fuenteService.getFuentes().subscribe({
      next: (data) => {
        this.fuentes = data.filter((fuente) => fuente.tipo !== 'BASE_DATOS');
      },
      error: (err) => {
        console.error('Error al cargar las fuentes:', err);
        this.showMessage('error', 'Error al cargar las fuentes');
      },
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  clearFile() {
    this.selectedFile = null;
    const fileInput = document.getElementById('archivo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input
    }
  }

  uploadFile() {
    if (this.formCarga.valid && this.selectedFile) {
      const { fuente, tipoArchivo } = this.formCarga.value;
      this.fileService
        .uploadFile('10', fuente.id, tipoArchivo, this.selectedFile)
        .subscribe({
          next: () => this.showMessage('success', 'Archivo cargado con éxito'),
          error: () => this.showMessage('error', 'Error al cargar el archivo'),
        });
    }
  }

  getFileAccept(): string {
    const tipo = this.formCarga.get('tipoArchivo')?.value;
    return tipo === 'RIS' ? '.ris' : tipo === 'BIBTEX' ? '.bib' : '';
  }

  showMessage(severity: string, detail: string) {
    this.messageService.add({ severity, detail, life: 3000 });
  }
}

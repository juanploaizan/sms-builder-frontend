# CREATE-CRUD.md

## Crear un nuevo CRUD en el proyecto

Este documento describe los pasos necesarios para crear una nueva interfaz CRUD en el proyecto, similar a la de "objetivos". Dependiendo de si la interfaz se compone de una sola página o de varias páginas, se utilizará una estructura de carpetas diferente.

### Estructura de carpetas

#### Interfaz de una sola página

Para una interfaz de una sola página, utilizaremos la siguiente estructura de carpetas:

```
nombre-de-la-interfaz/
  api/
    modelo.ts
  data-access/
    servicio.ts
  nombre-de-la-interfaz.component.ts
  nombre-de-la-interfaz.component.html
  nombre-de-la-interfaz.component.scss
```

#### Interfaz de varias páginas

Para una interfaz de varias páginas, utilizaremos la siguiente estructura de carpetas:

```
nombre-del-concepto/
  api/
    modelo.ts
  data-access/
    servicio.ts
  features/
    carpeta-componente/
      carpeta-componente.component.ts
      carpeta-componente.component.html
      carpeta-componente.component.scss
  nom-concep.routes.ts
```

### Pasos para crear un nuevo CRUD

#### 1. Crear la estructura de carpetas

Cree la estructura de carpetas adecuada según el tipo de interfaz que está creando (una sola página o varias páginas).

#### 2. Crear el modelo

En la carpeta `api`, cree un archivo para el modelo que se gestionará en la API. Por ejemplo, para una interfaz de "tareas":

```typescript
// nombre-de-la-interfaz/api/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
```

#### 3. Crear el servicio

En la carpeta

data-access

, cree un archivo para el servicio que se comunicará con la API del backend. Por ejemplo:

```typescript
// nombre-de-la-interfaz/data-access/task.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../api

/task

';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = 'https://localhost:8443/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}`);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.API_URL}`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
```

#### 4. Crear el componente

Utilice el comando

ng generate component

para generar los archivos del componente. Por ejemplo:

```sh
ng generate component dashboard/nombre-de-la-interfaz
```

Esto generará los archivos `nombre-de-la-interfaz.component.ts`, `nombre-de-la-interfaz.component.html` y `nombre-de-la-interfaz.component.scss`.

#### 5. Implementar el componente

Implemente la lógica del componente en el archivo `.ts`. Por ejemplo:

```typescript
// nombre-de-la-interfaz/nombre-de-la-interfaz.component.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../data-access/task.service";
import { Task } from "../api/task";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  formTask!: FormGroup;
  taskDialog: boolean = false;
  isSaving: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.formTask = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: ["", Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  openNew() {
    this.formTask.reset();
    this.taskDialog = true;
  }

  saveTask() {
    if (this.formTask.invalid) {
      this.showMessage("error", "Error", "Revisa los campos e intenta de nuevo");
      return;
    }

    this.isSaving = true;

    if (this.formTask.value.id) {
      this.taskService.updateTask(this.formTask.value).subscribe({
        next: (res) => {
          this.tasks[this.findIndexById(res.id)] = res;
          this.showMessage("success", "Exitoso", "Tarea actualizada");
          this.updateTasks();
        },
        error: () => {
          this.showMessage("error", "Error", "Error al actualizar la tarea");
        },
      });
    } else {
      this.taskService.createTask(this.formTask.value).subscribe({
        next: (res) => {
          this.tasks.push(res);
          this.showMessage("success", "Exitoso", "Tarea creada");
          this.updateTasks();
        },
        error: () => {
          this.showMessage("error", "Error", "Error al crear la tarea");
        },
      });
    }
    this.taskDialog = false;
    this.isSaving = false;
    this.formTask.reset();
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: "¿Seguro que quieres eliminar la tarea " + task.title + "?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter((val) => val.id !== task.id);
            this.showMessage("success", "Exitoso", "Tarea eliminada");
            this.updateTasks();
          },
          error: () => {
            this.showMessage("error", "Error", "Error al eliminar la tarea");
          },
        });
      },
    });
  }

  private findIndexById(id: string): number {
    return this.tasks.findIndex((task) => task.id === id);
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }

  private updateTasks() {
    this.tasks = [...this.tasks];
  }
}
```

#### 6. Implementar la plantilla HTML

Implemente la plantilla HTML en el archivo `.html`. Por ejemplo:

```html
<!-- nombre-de-la-interfaz/nombre-de-la-interfaz.component.html -->
<p-panel header="Gestión de tareas">
  <p-toolbar styleClass="mb-4 gap-2">
    <ng-template pTemplate="left">
      <p-button severity="success" label="Nuevo" icon="pi pi-plus" class="mr-2" (onClick)="openNew()" />
      <p-button severity="danger" label="Eliminar" icon="pi pi-trash" (onClick)="deleteSelectedTasks()" [disabled]="!selectedTasks || !selectedTasks.length" />
    </ng-template>

    <ng-template pTemplate="right">
      <p-button icon="pi pi-external-link" severity="help" label="Exportar" (onClick)="dt.exportCSV()" />
    </ng-template>
  </p-toolbar>

  <p-table #dt [columns]="cols" [value]="tasks" [(selection)]="selectedTasks" [paginator]="true" [globalFilterFields]="['title']" [rows]="5" [rowHover]="true" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }" currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} entradas" [showCurrentPageReport]="true" [rowsPerPageOptions]="[5, 10, 20]" [exportHeader]="'customExportHeader'">
    <ng-template pTemplate="caption">
      <div class="flex align-items-center justify-content-between">
        Tabla de tareas
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt.filterGlobal(searchValue, 'contains')" placeholder="Buscar..." />
        </span>
      </div>
    </ng-template>
    <ng-template pTemplate="header" let-columns>
      <tr>
        <th style="width: 4rem"><p-tableHeaderCheckbox /></th>
        <th *ngFor="let col of columns">{{ col.header }}</th>
        <th>Acciones</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-task>
      <tr>
        <td>
          <p-tableCheckbox [value]="task" />
        </td>
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" severity="success" (onClick)="editTask(task)" />
          <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (onClick)="deleteTask(task)" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="summary">
      <div class="flex align-items-center justify-content-between">En total hay {{ tasks ? tasks.length : 0 }} tarea/s.</div>
    </ng-template>
  </p-table>
</p-panel>

<p-dialog [(visible)]="taskDialog" [style]="{ width: '450px' }" header="Tarea" [modal]="true" styleClass="p-fluid">
  <ng-template pTemplate="content">
    <form [formGroup]="formTask">
      <div class="field">
        <label for="title">Título</label>
        <input type="text" pInputText id="title" formControlName="title" required autofocus />
      </div>
      <div class="field">
        <label for="description">Descripción</label>
        <textarea id="description" pInputTextarea formControlName="description" required rows="3" cols="20"> </textarea>
      </div>
    </form>
  </ng-template>
  <ng-template pTemplate="footer">
    <p-button label="Cancelar" icon="pi pi-times" severity="secondary" [text]="true" (onClick)="hideDialog()" />
    <p-button label="Guardar" icon="pi pi-check" [text]="true" [loading]="isSaving" type="submit" (onClick)="saveTask()" />
  </ng-template>
</p-dialog>

<p-confirmDialog [style]="{ width: '450px' }" />
```

#### 7. Configurar las rutas

Si la interfaz se compone de varias páginas, cree un archivo de rutas en la carpeta raíz del concepto. Por ejemplo:

```typescript
// nombre-del-concepto/nom-concep.routes.ts
import { Routes } from "@angular/router";
import { TaskComponent } from "./features/task/task.component";

export default [
  {
    path: "task",
    component: TaskComponent,
    title: "Gestión de Tareas - SMS Builder",
  },
] as Routes;
```

#### 8. Agregar las rutas al archivo principal de rutas

Agregue las rutas del nuevo concepto al archivo principal de rutas del proyecto. Por ejemplo:

```typescript
// src/app/app.routes.ts
import { Routes } from "@angular/router";
import { publicGuard, privateGuard } from "./core/guards/auth.guard";
import { LayoutComponent } from "./shared/ui/layout/layout.component";
import { RootPageComponent } from "./dashboard/features/root-page/root-page.component";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/features/auth.routes"),
    canActivate: [publicGuard],
  },
  {
    path: "",
    canActivate: [privateGuard],
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: RootPageComponent,
      },
      {
        path: "sms-configuration",
        loadComponent: () => import("./dashboard/sms-configuration/sms-configuration.component").then((m) => m.SmsConfigurationComponent),
      },
      {
        path: "goals",
        loadComponent: () => import("./dashboard/goals/goals.component").then((m) => m.GoalsComponent),
        title: "Paso 2 - Gestión de objetivos - SMS Builder",
      },
      {
        path: "tasks",
        loadComponent: () => import("./nombre-del-concepto/nom-concep.routes").then((m) => m.default),
      },
      {
        path: "**",
        redirectTo: "",
      },
    ],
  },
];
```

### 9. Agregar el ítem al carrusel

Para agregar el nuevo ítem al carrusel de pasos, siga estos pasos:

1. Abra el archivo step-carousel.component.ts
2. Agregue un nuevo objeto al array items con el step, label y path correspondientes a la nueva interfaz.
   Por ejemplo, si está agregando una nueva interfaz para "tareas":

```typescript
// step-carousel.component.ts
ngOnInit() {
  this.responsiveOptions = [
    // ... opciones responsivas
  ];

  this.items = [
    { step: 1, label: 'Configurar SMS', path: '/sms-configuration' },
    { step: 2, label: 'Objetivos', path: '/goals' },
    { step: 3, label: 'Preguntas', path: '/questions' },
    { step: 4, label: 'Tareas', path: '/tasks' }, // Nuevo ítem agregado
    { step: 5, label: 'Ejemplo 5', path: '/ejemplo5' },
    // ... otros ítems
  ];

  // Set the initial current path
  this.currentPath = this.router.url;
}
```

3. Guarde los cambios y verifique que el nuevo ítem aparezca en el carrusel de pasos.

### Conclusión

Siguiendo estos pasos, podrá crear un nuevo CRUD en el proyecto, ya sea una interfaz de una sola página o de varias páginas. Asegúrese de ajustar los nombres de los archivos y las rutas según sea necesario para su caso específico. Además, no olvide agregar el nuevo ítem al carrusel de pasos para que sea accesible desde la interfaz de usuario.

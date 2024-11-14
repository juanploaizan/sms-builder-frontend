import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Goal } from './api/goal';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoalService } from './data-access/goal.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-goals',
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
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent implements OnInit {
  formGoal!: FormGroup;
  goals: Goal[] = [];
  searchValue: string = '';
  goalDialog: boolean = false;
  selectedGoals!: Goal[];
  isSaving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private goalServie: GoalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.formGoal = this.fb.group({
      id: [''],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.goalServie.getGoals().subscribe((data) => {
      this.goals = data;
    });
  }

  openNew() {
    this.formGoal.reset();
    this.goalDialog = true;
  }

  deleteSelectedGoals() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar los objetivos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedGoals.forEach((goal) => {
          this.goalServie.deleteGoal(goal.id).subscribe();
        });
        this.goals = this.goals.filter(
          (val) => !this.selectedGoals.includes(val)
        );
        this.selectedGoals = [];
        this.showMessage('success', 'Exitoso', 'Objetivos eliminados');
      },
    });
  }

  editGoal(goal: Goal) {
    this.formGoal.patchValue(goal);
    this.goalDialog = true;
  }

  deleteGoal(goal: Goal) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar la meta ' + goal.codigo + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.goalServie.deleteGoal(goal.id).subscribe({
          next: () => {
            this.goals = this.goals.filter((val) => val.id !== goal.id);
            this.showMessage('success', 'Exitoso', 'Objetivo eliminado');
          },
          error: () => {
            this.showMessage('error', 'Error', 'Error al eliminar el objetivo');
          },
        });
      },
    });
  }

  hideDialog() {
    this.goalDialog = false;
    this.isSaving = false;
  }

  saveGoal() {
    if (this.formGoal.invalid) {
      this.showMessage(
        'error',
        'Error',
        'Revisa los campos e intenta de nuevo'
      );
      return;
    }

    this.isSaving = true;

    if (this.formGoal.value.id) {
      this.goalServie.updateGoal(this.formGoal.value).subscribe({
        next: (res) => {
          this.goals[this.findIndexById(this.formGoal.value.id)] = res;
          this.showMessage('success', 'Exitoso', 'Objetivo actualizado');
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al actualizar el objetivo');
        },
      });
    } else {
      this.goalServie.createGoal(this.formGoal.value).subscribe({
        next: (res) => {
          this.goals.push(res);
          this.showMessage('success', 'Exitoso', 'Objetivo creado');
        },
        error: () => {
          this.showMessage('error', 'Error', 'Error al crear el objetivo');
        },
      });
    }
    this.goalDialog = false;
    this.isSaving = false;
    this.formGoal.reset();
    this.goals = [...this.goals];
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
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

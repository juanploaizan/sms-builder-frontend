import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { QuestionService } from './data-access/question.service';
import { GoalService } from '../goals/data-access/goal.service';
import { Question } from './api/question';
import { Goal } from '../goals/api/goal';
import { MessageService } from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  imports: [
    // Angular Common Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // PrimeNG Modules
    TableModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
  ],
  providers: [MessageService], // Agrega el servicio aquí
})
export class QuestionsComponent implements OnInit {
  formQuestion!: FormGroup;
  questions: Question[] = [];
  goals: Goal[] = [];
  selectedGoals: Goal[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private goalService: GoalService,
    private messageService: MessageService // Inyección del servicio
  ) {}

  ngOnInit(): void {
    this.formQuestion = this.fb.group({
      id: [''],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.loadGoals();
    this.loadQuestions();
  }

  loadGoals() {
    this.goalService.getGoals().subscribe((data) => {
      this.goals = data;
    });
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  saveQuestion() {
    const question: Question = {
      ...this.formQuestion.value,
      objetivos: this.selectedGoals.map((goal) => goal.id),
      topicos: [],
    };

    if (this.isEditMode) {
      this.questionService.updateQuestion(question).subscribe(() => {
        this.loadQuestions();
        this.resetForm();
        this.showMessage('success', 'Pregunta actualizada con éxito');
      });
    } else {
      this.questionService.createQuestion(question).subscribe(() => {
        this.loadQuestions();
        this.resetForm();
        this.showMessage('success', 'Pregunta creada con éxito');
      });
    }
  }

  addTopicToQuestion(question: Question) {
    // Lógica para agregar un tópico
  }

  editQuestion(question: Question) {
    this.isEditMode = true;
    this.formQuestion.patchValue(question);
    this.selectedGoals = this.goals.filter((goal) =>
      question.objetivos.includes(goal.id)
    );
  }

  deleteQuestion(question: Question) {
    if (!question.id) return;
    this.questionService.deleteQuestion(question.id).subscribe(() => {
      this.loadQuestions();
      this.showMessage('success', 'Pregunta eliminada con éxito');
    });
  }

  resetForm() {
    this.isEditMode = false;
    this.formQuestion.reset();
    this.selectedGoals = [];
  }

  showMessage(severity: string, detail: string) {
    this.messageService.add({
      severity,
      detail,
      life: 3000,
    });
  }

  getGoalDescription(goalId: string): string {
    const goal = this.goals.find((g) => g.id === goalId);
    return goal ? goal.codigo : 'Desconocido';
  }

}

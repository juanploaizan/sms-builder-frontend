import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { GoalService } from '../goals/data-access/goal.service';
import { Goal } from '../goals/api/goal';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextareaModule,
    PanelModule,
    TableModule,
    DialogModule,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  questions: {
    code: string;
    question: string;
    relatedGoals: string[];
    editing?: boolean;
  }[] = [];
  goals: Goal[] = [];
  selectedGoals: Goal[] = [];
  showTopicDialog: boolean = false;
  newTopic: { name: string; tags: string[] } = { name: '', tags: [] };

  constructor(private fb: FormBuilder, private goalService: GoalService) {
    this.questionsForm = this.fb.group({
      code: ['', Validators.required],
      question: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.goalService.getGoals().subscribe((data) => {
      this.goals = data;
    });
  }

  onGoalToggle(goal: Goal) {
    const index = this.selectedGoals.indexOf(goal);
    if (index === -1) {
      this.selectedGoals.push(goal);
    } else {
      this.selectedGoals.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.questionsForm.valid && this.selectedGoals.length > 0) {
      const newQuestion = {
        code: this.questionsForm.value.code,
        question: this.questionsForm.value.question,
        relatedGoals: this.selectedGoals.map((goal) => goal.descripcion),
      };
      this.questions.push(newQuestion);
      this.questionsForm.reset();
      this.selectedGoals = [];
    } else {
      alert('Debes seleccionar al menos un objetivo.');
    }
  }

  editQuestion(question: any) {
    question.editing = true;
  }

  deleteQuestion(question: any) {
    const index = this.questions.indexOf(question);
    if (index > -1) {
      this.questions.splice(index, 1);
    }
  }

  addTopic(question: any) {
    this.showTopicDialog = true;
    this.newTopic = { name: '', tags: [] };
  }

  addTopicToQuestion() {
    this.showTopicDialog = false;
    console.log('Nuevo tópico:', this.newTopic);
    // Aquí puedes manejar la lógica para añadir tópicos a la pregunta
  }
}

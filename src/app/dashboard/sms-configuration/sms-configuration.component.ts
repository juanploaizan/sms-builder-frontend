import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-sms-configuration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
  ],
  templateUrl: './sms-configuration.component.html',
  styleUrl: './sms-configuration.component.scss',
})
export class SmsConfigurationComponent {
  smsForm: FormGroup;
  displayModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.smsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.smsForm.valid) {
      console.log(this.smsForm.value);
      // Aquí puedes agregar la lógica para enviar los datos del formulario
    }
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe((response) => {
        if (response) {
          this.authService.loadUserData(response.userId).subscribe((user) => {
            console.log(user.names);
            localStorage.setItem('userName', user.names);
          });
          this.router.navigate(['/plan']);
        } else {
          console.log('Credenciales invalidas');
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}

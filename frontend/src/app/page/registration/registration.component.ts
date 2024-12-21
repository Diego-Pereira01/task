import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Certifique-se de que o caminho está correto
import { Router } from '@angular/router'; // Importar o Router para navegação

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule],
  providers: [ApiService] // Adicione o ApiService aos providers
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(@Inject(ApiService) private apiService: ApiService, private router: Router) {}

  async onSubmit() {
    console.log('Form submitted');
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      console.log(this.errorMessage);
      return;
    }

    try {
      console.log('Calling registerUser API');
      const data = await this.apiService.registerUser({
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.successMessage = data.message || 'Registro realizado com sucesso!';
      this.errorMessage = '';
      console.log(this.successMessage);

      // Redirecionar para a página de login após o registro bem-sucedido
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'Erro ao registrar. Tente novamente.';
      console.error('Registration error:', error);
    }
  }
}

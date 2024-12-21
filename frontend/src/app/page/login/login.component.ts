import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ApiService } from '../../services/api.service'; // Certifique-se de que o caminho está correto
import { Router } from '@angular/router'; // Importar Router para navegação

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService],
  standalone: true,
  imports: [FormsModule, CommonModule] // Adicionar CommonModule aqui
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = ''; // Tipo da notificação (success, error, warning, info)

  constructor(private apiService: ApiService, private router: Router) {}

  async onSubmit() {
    try {
      // Chamando o serviço para fazer o login
      const response = await this.apiService.loginUser({ email: this.email, password: this.password });

      // Sucesso no login
      this.notificationType = 'success'; // Tipo de notificação para sucesso
      this.showNotification = true;
      console.log('Login successful:', response);

      // Ocultar a notificação após 3 segundos
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);

      // Redirecionar para a página '/home' após o login bem-sucedido
      this.router.navigate(['/home']);

    } catch (error) {
      // Caso ocorra erro no login
      this.notificationType = 'error'; // Tipo de notificação para erro
      this.showNotification = true;

      this.errorMessage = 'Login falhou. Verifique suas credenciais e tente novamente.';
      console.error('Login error:', error);

      // Ocultar a notificação após 3 segundos
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}

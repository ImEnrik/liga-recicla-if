import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput,
  IonButton, IonSegment, IonSegmentButton, IonLabel, ToastController,
} from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
    IonInput, IonButton, IonSegment, IonSegmentButton, IonLabel,
  ],
})
export class LoginPage {
  modo: 'login' | 'cadastro' = 'login';
  email = '';
  senha = '';
  carregando = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
  ) {}

  async enviar() {
    if (!this.email || !this.senha) {
      return this.avisar('Preencha e-mail e senha.');
    }
    this.carregando = true;
    try {
      if (this.modo === 'cadastro') {
        await this.auth.cadastrar(this.email, this.senha);
      } else {
        await this.auth.entrar(this.email, this.senha);
      }
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e: any) {
      this.avisar(this.traduzir(e?.code));
    } finally {
      this.carregando = false;
    }
  }

  async google() {
    try {
      await this.auth.entrarComGoogle();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e: any) {
      this.avisar(this.traduzir(e?.code));
    }
  }

  private traduzir(code?: string) {
    switch (code) {
      case 'auth/email-already-in-use': return 'Esse e-mail já está cadastrado.';
      case 'auth/invalid-email': return 'E-mail inválido.';
      case 'auth/weak-password': return 'A senha precisa de pelo menos 6 caracteres.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found': return 'E-mail ou senha incorretos.';
      case 'auth/popup-closed-by-user': return 'Login com Google cancelado.';
      default: return 'Erro ao autenticar. Tente de novo.';
    }
  }

  private async avisar(message: string) {
    const t = await this.toast.create({ message, duration: 2500, position: 'top' });
    await t.present();
  }
}
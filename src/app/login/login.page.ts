import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private alertController: AlertController, private router: Router, private authService: AuthService) { }

  ngOnInit() {}


  async onSubmit() {
    try {
      const response = await this.authService.login(this.email, this.password);
      await this.authService.login(this.email, this.password);
      const alert = await this.alertController.create({
        header: 'Login Success',
        message: 'You have logged in successfully!',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/home']); 
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Invalid credentials. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }




  // Función para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Función para navegación
  onSignUp() {
    this.router.navigateByUrl("sign-up");
  }

  onReset() {
    this.router.navigateByUrl("password");
  }
}


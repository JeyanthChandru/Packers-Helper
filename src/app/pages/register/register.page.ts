import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as Users;
  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {
  }

  async register(user: Users) {
    try {
      this.user = { email: undefined, password: undefined };
      const result = await this.authService.registerUser(user);

      if (result.user.uid && result.user.uid != null) {
        const alert = await this.alertController.create({
          header: 'Packers Helper',
          subHeader: 'Successfully Registered',
          message: "Please login with the credentials",
          buttons: ["Ok"]
        });
        await alert.present();
        await alert.onDidDismiss().then(() => {
          this.router.navigate(['/login']);
        });

      }
    }
    catch (exception) {
      console.error(exception);
      if (exception.message != undefined) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Packers Helper',
          subHeader: 'Could not Register',
          message: exception.message,
          buttons: ["Ok"]
        });
        await alert.present();
      }
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}

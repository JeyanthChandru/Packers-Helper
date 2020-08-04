import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Users;
  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {
  }

  async login(user: Users) {
    try {
      const result = await this.authService.loginUser(user);

      if (result) {
        this.router.navigate(['home'], this.authService.populateUserId(result.user.uid, result.user.email));
      }
    }
    catch (exception) {
      console.error(exception);
      if (exception.message != undefined) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Packers Helper',
          subHeader: 'Could not Login',
          message: exception.message,
          buttons: ["Ok"]
        });
        await alert.present();
      }
    }

  }

  register() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
  }

}

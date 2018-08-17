import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Users } from '../../models/users/users.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as Users;
  constructor(public navCtrl: NavController, private authService: AuthServiceProvider) {
  }

  async login(user: Users) {
    try {
      const result = await this.authService.loginUser(user);
      if (result) {
        this.navCtrl.setRoot('HomePage');
      }
    }
    catch (e) {
      console.error(e);
    }

  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Users } from '../../models/users/users.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as Users;
  constructor(public navCtrl: NavController, private authService: AuthServiceProvider) {
  }

  async register(user: Users) {
    try {
      const result = await this.authService.registerUser(user);
      if (result.user.uid && result.user.uid != null) {
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  login() {
    this.navCtrl.pop();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../models/users/users.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as Users;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  }

  async register(user: Users) {
    try {
      const result = await this.authService.registerUser(user);
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }

  login() {
    this.navCtrl.pop();
  }

}

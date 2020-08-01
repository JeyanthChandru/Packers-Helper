import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { AuthService } from 'src/app/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as Users;
  constructor(public location: Location, private authService: AuthService) {
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
    this.location.back();
  }

  ngOnInit() {
  }

}

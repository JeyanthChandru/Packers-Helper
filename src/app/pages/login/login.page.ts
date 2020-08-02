import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Users;
  constructor(private router: Router, private authService: AuthService) {
  }

  async login(user: Users) {
    try {
      const result = await this.authService.loginUser(user);
      
      if (result) {
        this.router.navigate(['home'], this.authService.populateUserId(result.user.uid));
      }
    }
    catch (e) {
      console.error(e);
    }

  }

  register() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
  }

}

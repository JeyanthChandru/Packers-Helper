import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Users;
  constructor(public navCtrl: NavController, 
    private authService: AuthService,
    private router: Router) {
  }

  async login(user: Users) {
    try {
      const result = await this.authService.loginUser(user);
      if (result) {
        this.router.navigate(['/home']);
      }
    }
    catch (e) {
      console.error(e);
    }

  }

  register() {
    this.router.navigate(['/register']);
  }


  ngOnInit() {
  }

}

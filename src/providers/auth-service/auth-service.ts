import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Users } from '../../models/users/users.model';

@Injectable()
export class AuthServiceProvider {
  constructor(public http: HttpClient, private auth: AngularFireAuth) {
  }

  getUID() {
    return this.auth.auth.currentUser;
  }

  registerUser(user: Users) {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginUser(user: Users) {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logoutUser() {
    return this.auth.auth.signOut();
  }

}

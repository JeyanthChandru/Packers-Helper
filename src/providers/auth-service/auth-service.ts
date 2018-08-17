import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Users } from '../../models/users/users.model';

@Injectable()
export class AuthServiceProvider {
  constructor(private auth: AngularFireAuth) {
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

  logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.signOut()
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getEmail() {
    return this.auth.auth.currentUser.email
  }

}

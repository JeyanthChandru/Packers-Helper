import { Injectable } from '@angular/core';
import { Users } from '../models/users/users.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {
  }

  getUID() {
    return this.angularFireAuth.currentUser;
  }

  registerUser(user: Users) {
    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginUser(user: Users) {
    return this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signOut()
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getEmail() {
    return this.angularFireAuth.currentUser.then(userInfo => userInfo.email)
  }
}

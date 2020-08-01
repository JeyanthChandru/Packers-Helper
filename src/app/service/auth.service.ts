import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Users } from "../models/users/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {
  }

  getUID() {
    return this.auth.currentUser;
  }

  registerUser(user: Users) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginUser(user: Users) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getEmail() {
    return this.auth.currentUser.then(userInfo => userInfo.email)
  }

}

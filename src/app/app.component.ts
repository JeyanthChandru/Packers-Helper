import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { timer } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  rootPage: string;
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const authObserver = afAuth.authState.subscribe(user => {
        if (user) {
          this.rootPage = 'HomePage';
          authObserver.unsubscribe();
        } else {
          this.rootPage = 'LoginPage';
          authObserver.unsubscribe();
        }
      });
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MoveDetailsProvider } from '../providers/move-details/move-details';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { BoxDetailsProvider } from '../providers/box-details/box-details';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Printer } from '../../node_modules/@ionic-native/printer';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MoveDetailsProvider,
    BoxDetailsProvider,
    BarcodeScanner,
    Printer,
  ]
})
export class AppModule { }

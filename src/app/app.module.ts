import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from "@ionic-native/camera";
import { Crop } from "@ionic-native/crop";

import { MyApp } from './app.component';
import { MoveDetailsProvider } from '../providers/move-details/move-details';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { BoxDetailsProvider } from '../providers/box-details/box-details';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Printer } from '../../node_modules/@ionic-native/printer';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { FIREBASE_CONFIG } from './app.firebase.config';
import { IonicImageViewerModule } from '../../node_modules/ionic-img-viewer';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonicImageViewerModule,
    AngularFireAuthModule
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
    Camera,
    Crop,
    AuthServiceProvider,
  ]
})
export class AppModule { }

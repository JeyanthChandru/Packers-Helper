import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoggingServiceModule } from 'ionic-logging-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuthModule,
    LoggingServiceModule,
    BarcodeScanner,
    Printer,
    Camera,
    QRCodeModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

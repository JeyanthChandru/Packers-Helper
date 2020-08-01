import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FIREBASE_CONFIG } from './app.firebase.config';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AuthService } from './service/auth.service';
import { BoxDetailsService } from './service/box-details.service';
import { MoveDetailsService } from './service/move-details.service';
import { SharedMoveDetailsService } from './service/shared-move-details.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule, 
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Printer,
    Camera,
    AuthService,
    BoxDetailsService,
    MoveDetailsService,
    SharedMoveDetailsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

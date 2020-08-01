import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Box } from 'src/app/models/box-model/box.model';
import { NavParams, ActionSheetController, ModalController } from '@ionic/angular';
import { BoxDetailsService } from 'src/app/service/box-details.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-box',
  templateUrl: './new-box.page.html',
  styleUrls: ['./new-box.page.scss'],
})
export class NewBoxPage implements OnInit {

  createdCode = null;
  photoURL: string = "../../assets/imgs/icon.png";

  public form: FormGroup;
  private box: Box;
  private photoRemoved: boolean;

  constructor(
    private modalController: ModalController,
    private _FB: FormBuilder,
    private boxDetails: BoxDetailsService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private route: ActivatedRoute,
    private router: Router) {
    this.photoRemoved = false;
    this.form = this._FB.group({
      name: ['', Validators.required],
      content: this._FB.array([
        this.initContentFields()
      ])
    });

    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.box != undefined) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
        this.form.controls.name.patchValue(this.box.name);
      this.box.content.forEach(element => {
        this.addValuesToInputField(element.name, element.quantity);
      });
      this.removeInputField(0);
      } else if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.sharedBox != undefined) {
        this.box = this.router.getCurrentNavigation().extras.state.sharedBox;
        this.form.controls.name.patchValue(this.box.name);
        this.box.content.forEach(element => {
          this.addValuesToInputField(element.name, element.quantity);
        });
        this.removeInputField(0);
      }
      else {
        this.box = { $key: undefined, name: undefined, qr: undefined, image: undefined, content: [{ name: undefined, quantity: undefined }] }
      }
    });



  }

  initContentFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addContentToFields(name, quantity): FormGroup {
    return this._FB.group({
      name: [name, Validators.required],
      quantity: [quantity, Validators.required]
    });
  }

  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetWidth: 300,
        targetHeight: 300,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: false,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;
      this.photoURL = image;

    }
    catch (e) {
      console.log('Camera Error : ', e);
    }
  }

  async importPicture() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetWidth: 300,
        targetHeight: 300,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
      }
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.photoURL = image;
    }
    catch (e) {
      console.log('Camera Error : ', e);
    }
  }

  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      subHeader: 'Menu',
      buttons: [
        {
          text: 'Take Picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Import from Gallery',
          handler: () => {
            this.importPicture();
          }
        },
        {
          text: 'Remove Picture',
          role: 'destructive',
          handler: () => {
            this.photoRemoved = true;
            this.photoURL = "../../assets/imgs/icon.png";
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.content;
    control.push(this.initContentFields());
  }

  addValuesToInputField(name, quantity): void {
    const control = <FormArray>this.form.controls.content;
    control.push(this.addContentToFields(name, quantity));
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.content;
    control.removeAt(i);
  }

  manage(val: Box): void {
    if (this.photoURL != "../../assets/imgs/icon.png") {
      val.image = this.photoURL
    }
    if (this.router.getCurrentNavigation().extras.state.box != undefined) {
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getMoveKey(),
        box: this.box.$key
      });
      setTimeout(() => {
        val.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        if (this.photoURL == "../../assets/imgs/icon.png") {
          this.boxDetails.addBoxToDB(this.box.$key, val);
        }
        else {
          this.boxDetails.updateBox(this.box.$key, val);
        }

        this.closeModal();
      }, 300);
    }
    else if (this.router.getCurrentNavigation().extras.state.sharedBox != undefined) {
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getSharedMoveKey(),
        box: this.box.$key
      });
      setTimeout(() => {
        val.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        if (this.photoURL == "../../assets/imgs/icon.png") {
          this.boxDetails.addSharedBoxToDB(this.box.$key, val);
        }
        else {
          this.boxDetails.updateBox(this.box.$key, val);
        }

        this.closeModal();
      }, 300);
    }
    else if (this.router.getCurrentNavigation().extras.state.isSharedBox != undefined) {
      const key = this.boxDetails.createSharedBox()
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getMoveKey(),
        box: key,
      });
      setTimeout(() => {
        val.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        this.boxDetails.addSharedBoxToDB(key, val);
        this.closeModal();
      }, 300);
    }
    else {
      const key = this.boxDetails.createBox()
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getMoveKey(),
        box: key,
      });
      setTimeout(() => {
        val.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        this.boxDetails.addBoxToDB(key, val);
        this.closeModal();
      }, 300);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}

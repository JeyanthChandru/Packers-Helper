import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '../../../node_modules/@angular/forms';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';
import { CameraOptions, Camera } from '../../../node_modules/@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-new-box',
  templateUrl: 'new-box.html',
})
export class NewBoxPage {
  createdCode = null;
  photoURL: string = "../../assets/imgs/icon.png";

  public form: FormGroup;
  private box: Box;
  private photoRemoved: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private _FB: FormBuilder,
    private boxDetails: BoxDetailsProvider,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera) {

    this.form = this._FB.group({
      name: ['', Validators.required],
      content: this._FB.array([
        this.initContentFields()
      ])
    });

    if (this.navParams.get('name') != undefined) {
      this.box = this.navParams.data
      this.form.controls.name.patchValue(this.box.name);
      this.box.content.forEach(element => {
        this.addValuesToInputField(element.name, element.quantity);
      });
      this.removeInputField(0);
    }
    else {
      this.box = { $key: undefined, name: undefined, qr: undefined, image: undefined, content: [{ name: undefined, quantity: undefined }] }
    }

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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      subTitle: 'Menu',
      buttons: [
        {
          text: 'Take Picture',
          handler: () => {
            this.takePicture()
          }
        },
        {
          text: 'Import from Gallery',
          handler: () => {
            this.importPicture()
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
    if (this.box.$key != undefined) {
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
    this.view.dismiss();
  }
}

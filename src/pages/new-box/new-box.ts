import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, normalizeURL, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '../../../node_modules/@angular/forms';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';
import { CameraOptions, Camera } from '../../../node_modules/@ionic-native/camera';
import { CropOptions, Crop } from '../../../node_modules/@ionic-native/crop';
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ImagePicker } from '../../../node_modules/@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-new-box',
  templateUrl: 'new-box.html',
})
export class NewBoxPage {
  createdCode = null;
  photoURL: string = "../../assets/imgs/icon.png";

  public form: FormGroup;
  photos: Array<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private _FB: FormBuilder,
    private boxDetails: BoxDetailsProvider,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private cropService: Crop,
    private platform: Platform,
    private firebaseService: FirebaseProvider,
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker) {

    this.form = this._FB.group({
      name: ['', Validators.required],
      content: this._FB.array([
        this.initContentFields()
      ])
    });
  }

  initContentFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  uploadImageToFirebase(image) {
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image)
      .then(photoURL => {

        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }

  takePicture() {
    let options = {
      quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then((data) => {
        this.photos = new Array<string>();
        this.cropService
          .crop(data, { quality: 75 })
          .then((newImage) => {
            this.photos.push(newImage);
            this.uploadImageToFirebase(newImage);
          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.cropService.crop(results[i], { quality: 75 }).then(
                  newImage => {
                    this.uploadImageToFirebase(newImage);
                  },
                  error => console.error("Error cropping image", error)
                );
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      subTitle: 'Menu',
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
            this.openImagePicker();
          }
        },
        {
          text: 'Remove Picture',
          role: 'destructive'
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

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.content;
    control.removeAt(i);
  }

  manage(val: Box): void {
    val['appname'] = 'PackersHelper';
    this.createdCode = JSON.stringify(val);
    delete val['appname'];
    setTimeout(() => {
      val.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
      this.boxDetails.addBoxToDB(val);
      this.closeModal();
    }, 300);
  }

  closeModal() {
    this.view.dismiss();
  }
}

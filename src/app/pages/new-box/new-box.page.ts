import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Box } from 'src/app/models/box-model/box.model';
import { NavParams, ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BoxService } from 'src/app/service/box.service';

@Component({
  selector: 'app-new-box',
  templateUrl: './new-box.page.html',
  styleUrls: ['./new-box.page.scss'],
})
export class NewBoxPage implements OnInit {

  @Input() box: Box;
  @Input() sharedBox: Box;

  createdCode = null;
  photoURL: string = "../../../assets/imgs/icon.png";

  public form: FormGroup;
  private photoRemoved: boolean;

  constructor(
    public navParams: NavParams,
    private modalController: ModalController,
    private _FB: FormBuilder,
    private boxDetails: BoxService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera) {
    this.photoRemoved = false;
    this.form = this._FB.group({
      name: ['', Validators.required],
      content: this._FB.array([
        this.initContentFields()
      ])
    });

  }
  ngOnInit(): void {
    if (this.box != undefined) {
      this.form.controls.name.patchValue(this.box.name);
      this.box.content.forEach(element => {
        this.addValuesToInputField(element.name, element.quantity);
      });
      this.removeInputField(0);
    }
    // else if (this.navParams.data.sharedBox != undefined) {
    //   this.box = this.navParams.data.sharedBox;
    //   this.form.controls.name.patchValue(this.box.name);
    //   this.box.content.forEach(element => {
    //     this.addValuesToInputField(element.name, element.quantity);
    //   });
    //   this.removeInputField(0);
    // }
    else {
      this.box = { $key: undefined, name: undefined, qr: undefined, image: undefined, content: [{ name: undefined, quantity: undefined }] }
    }

    // console.log(this.box.image);
    // console.log(this.photoRemoved)
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

  openImage(url: string) {
    // this.photoViewer.show(url);
  }

  async presentActionSheet() {
    let buttons = [
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
          this.photoURL = "../../../assets/imgs/icon.png";
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      }
    ];
    if (((this.box.image == undefined && this.photoURL === '../../../assets/imgs/icon.png') || this.photoRemoved) && buttons.length === 4) {
      buttons.splice(2, 1);
    }

    let actionSheet = await this.actionSheetCtrl.create({
      buttons: buttons
    });

    await actionSheet.present();
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

  manage(box: Box): void {
    if (this.photoURL != "../../../assets/imgs/icon.png") {
      box.image = this.photoURL
    }
    if (this.navParams.data.box != undefined) {
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getMoveKey(),
        box: this.box.$key
      });
      setTimeout(() => {
        var extraParams;
        box.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        // console.log("Params: ", box);
        // console.log("Actual: ", this.box);
        if (box === this.box) {
          // console.log("Add Path");
          extraParams = { isEdited: false };
        }
        else if (this.box.$key !== undefined) {
          // console.log("Edit Path");
          this.boxDetails.updateBox(this.box.$key, box);
          extraParams = { isEdited: true, box: box };
        } else {
          this.boxDetails.addBoxToDB(this.box.$key, box);
          extraParams = { isEdited: false };
        }

        this.closeModal(extraParams);
      }, 300);
    }
    else if (this.navParams.data.sharedBox != undefined) {
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getSharedMoveKey(),
        box: this.box.$key
      });
      setTimeout(() => {
        var extraParams;
        box.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        // console.log("Params: ", this.navParams.data.sharedBox);
        if (box === this.box) {
          extraParams = { isEdited: false };
        }
        else if (this.box.$key !== undefined) {
          this.boxDetails.updateBox(this.box.$key, box);
          extraParams = { isEdited: true, sharedBox: box };
        } else {
          this.boxDetails.addSharedBoxToDB(this.box.$key, box);
          extraParams = { isEdited: false };
        }

        this.closeModal(extraParams);
      }, 300);
    }
    else if (this.navParams.get('isSharedBox') != undefined) {
      const key = this.boxDetails.createSharedBox()
      this.createdCode = JSON.stringify({
        appname: 'PackersHelper',
        move: this.boxDetails.getMoveKey(),
        box: key,
      });
      setTimeout(() => {
        box.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        this.boxDetails.addSharedBoxToDB(key, box);
        this.modalController.dismiss();
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
        box.qr = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
        this.boxDetails.addBoxToDB(key, box);
        this.modalController.dismiss();
      }, 300);
    }
  }

  closeModal(extraParams) {
    // console.log(extraParams);
    this.modalController.dismiss(extraParams);
  }

}

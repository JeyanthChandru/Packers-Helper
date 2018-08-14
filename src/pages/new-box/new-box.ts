import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-box',
  templateUrl: 'new-box.html',
})
export class NewBoxPage {
  qrData = null;
  createdCode = null;

  public form: FormGroup;
  picture = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private _FB: FormBuilder) {

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

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.content;
    control.push(this.initContentFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.content;
    control.removeAt(i);
  }

  manage(val: Object): void {
    val['appname'] = 'PackersHelper';
    // var getQRImage = document.getElementsByClassName('new-box-class');
    // console.log(getQRImage);
    this.createdCode = JSON.stringify(val);
    setTimeout(() => {
      this.picture = document.getElementById("QR_Canvas").firstElementChild.firstElementChild.getAttribute('src');
    }, 300);
    // console.log(val);
  }

  closeModal() {
    this.view.dismiss();
  }
}

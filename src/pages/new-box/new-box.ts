import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '../../../node_modules/@angular/forms';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';

@IonicPage()
@Component({
  selector: 'page-new-box',
  templateUrl: 'new-box.html',
})
export class NewBoxPage {
  qrData = null;
  createdCode = null;

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private _FB: FormBuilder,
    private boxDetails: BoxDetailsProvider) {

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

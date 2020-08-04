import { Component, OnInit, Input } from '@angular/core';
import { SharedMove } from 'src/app/models/new-shared-move/new-shared-move.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { SharedMoveService } from 'src/app/service/shared-move.service';

@Component({
  selector: 'app-new-shared-move',
  templateUrl: './new-shared-move.page.html',
  styleUrls: ['./new-shared-move.page.scss'],
})
export class NewSharedMovePage implements OnInit {

  @Input() sharedMove: SharedMove;
  @Input() sharedKey: string;
  @Input() isAdmin: boolean = true;

  minDate: String = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getFullYear() + 10)).toISOString();

  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private _FB: FormBuilder,
    private sharedMoveDetails: SharedMoveService) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
      emails: this._FB.array([
        this.initContentFields(),
      ]),
    });
  }

  ngOnInit() {
    if (this.sharedMove != undefined) {
      this.form.controls.name.patchValue(this.sharedMove.name);
      this.form.controls.date.patchValue(this.sharedMove.date);
      this.sharedMove.emails.forEach(email => {
        this.addValuesToInputField(email);
      });
      this.removeInputField(0);
    }
  }

  closeModal(edited: boolean) {
    this.modalController.dismiss({ edited: edited });
  }

  initContentFields(): FormGroup {
    return this._FB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  addContentToFields(email): FormGroup {
    return this._FB.group({
      email: [email, Validators.compose([Validators.required, Validators.email])],
    });
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.emails;
    control.removeAt(i);
  }

  checkUniqueEmail(control) {
    let uniqueValues = []
    for (var i = 0; i < control.value.length; i++) {
      if (control.value[i].email != '') {
        if (uniqueValues.indexOf(control.value[i].email) == -1) {
          uniqueValues.push(control.value[i].email);
        } else {
          control.removeAt(i);
        }
      }
    }
    return uniqueValues;
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.emails;
    control.push(this.initContentFields());
    this.checkUniqueEmail(control);
  }

  addValuesToInputField(email): void {
    const control = <FormArray>this.form.controls.emails;
    control.push(this.addContentToFields(email));
  }

  addNewSharedMove(sharedMove: SharedMove) {
    const control = <FormArray>this.form.controls.emails;
    sharedMove.emails = this.checkUniqueEmail(control);
    if (this.isAdmin) {
      if (this.sharedMove != undefined) {
        var removedEmails = []
        var addedEmails = []
        this.sharedMove.emails.forEach(email => {
          if (sharedMove.emails.indexOf(email) == -1) {
            removedEmails.push(email);
          }
        });
        sharedMove.emails.forEach(email => {
          if (this.sharedMove.emails.indexOf(email) == -1) {
            addedEmails.push(email);
          }
        });
        this.sharedMoveDetails.updateSharedMove(this.sharedKey, this.sharedMove.$key, removedEmails, addedEmails, sharedMove);
        this.closeModal(true);
      }
      else {
        const sharedKey = this.sharedMoveDetails.createSharedMove();
        this.sharedMoveDetails.addMoveToDB(sharedKey, sharedMove);
        this.closeModal(false);
      }
    }
    else {
      this.sharedMoveDetails.updateSharedMoveOnly(this.sharedKey, this.sharedMove.$key, sharedMove);
      this.closeModal(true);
    }

  }

}
